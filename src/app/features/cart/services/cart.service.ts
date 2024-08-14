import { Injectable } from '@angular/core';
import { GlobalService } from '../../../core/services/global.service';
import { map, Observable, of, switchMap } from 'rxjs';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private snackBar: MatSnackBar
  ) {}

  async addToCart(product: any) {
    const user = this.auth.currentUser;

    if (user) {
      try {
        if (product.id && product.title && product.price) {
          const cartRef = collection(this.firestore, 'users', user.uid, 'cart');
          const productRef = doc(cartRef, product.id.toString()); // ID debe ser una cadena

          const docSnapshot = await getDoc(productRef);

          if (docSnapshot.exists()) {
            const existingData = docSnapshot.data();
            const newQuantity = (existingData?.['quantity'] || 0) + 1;

            await setDoc(
              productRef,
              {
                productId: product.id,
                title: product.title,
                price: product.price,
                quantity: newQuantity,
                imageUrl: product.images[0] || '',
                thumbnail: product.thumbnail || '',
              },
              { merge: true }
            );

            console.log('Cantidad actualizada en el carrito.');
            this.snackBar.open(
              'Cantidad actualizada en el carrito.',
              'Cerrar',
              {
                duration: 3000,
              }
            );
          } else {
            await setDoc(
              productRef,
              {
                productId: product.id,
                title: product.title,
                price: product.price,
                quantity: 1,
                imageUrl: product.images[0] || '',
                thumbnail: product.thumbnail || '',
              },
              { merge: true }
            );

            console.log('Producto agregado al carrito exitosamente.');
            this.snackBar.open(
              'Producto agregado al carrito exitosamente.',
              'Cerrar',
              {
                duration: 3000,
              }
            );
          }
        } else {
          console.error('El producto no tiene los campos necesarios:', product);
          this.snackBar.open(
            'El producto no tiene los campos necesarios:',
            'Cerrar',
            {
              duration: 3000,
            }
          );
        }
      } catch (error) {
        console.error('Error al agregar al carrito:', error);
        this.snackBar.open('Error al agregar al carrito:', 'Cerrar', {
          duration: 3000,
        });
      }
    } else {
      console.error('No hay un usuario autenticado.');
      this.snackBar.open('No hay un usuario autenticado.', 'Cerrar', {
        duration: 3000,
      });
    }
  }

  getCartItemsCount(): Observable<number> {
    const user = this.auth.currentUser;
    if (user) {
      const cartRef = collection(this.firestore, 'users', user.uid, 'cart');
      return collectionData(cartRef, { idField: 'id' }).pipe(
        map((items: any) =>
          items.reduce(
            (count: number, item: any) => count + (item.quantity || 0),
            0
          )
        )
      );
    } else {
      this.snackBar.open('No hay usuario autenticado', 'Cerrar', {
        duration: 3000,
      });
      return of(0);
    }
  }

  getCartItems(): Observable<any[]> {
    const user = this.auth.currentUser;
    if (user) {
      const cartRef = collection(this.firestore, 'users', user.uid, 'cart');
      return collectionData(cartRef, { idField: 'id' }).pipe(
        map((items: any) =>
          items.map((item: any) => ({
            id: item.id,
            ...item,
          }))
        )
      );
    } else {
      this.snackBar.open('No hay usuario autenticado', 'Cerrar', {
        duration: 3000,
      });
      return of([]);
    }
  }
}
