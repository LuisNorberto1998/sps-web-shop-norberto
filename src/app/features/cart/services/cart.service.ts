import { Injectable } from '@angular/core';
import { GlobalService } from '../../../core/services/global.service';
import { catchError, from, map, Observable, of, switchMap, tap } from 'rxjs';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
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
          const productRef = doc(cartRef, product.id.toString());

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

  removeFromCart(productId: string): Observable<void> {
    const user = this.auth.currentUser;

    if (user) {
      const cartRef = collection(this.firestore, 'users', user.uid, 'cart');
      const productRef = doc(cartRef, productId);

      return from(deleteDoc(productRef)).pipe(
        tap(() => {
          this.snackBar.open('Producto eliminado del carrito.', 'Cerrar', {
            duration: 3000,
          });
        }),
        catchError((error) => {
          console.error('Error al eliminar del carrito:', error);
          this.snackBar.open('Error al eliminar del carrito.', 'Cerrar', {
            duration: 3000,
          });
          return of();
        })
      );
    } else {
      this.snackBar.open('No hay un usuario autenticado.', 'Cerrar', {
        duration: 3000,
      });
      return of();
    }
  }
}
