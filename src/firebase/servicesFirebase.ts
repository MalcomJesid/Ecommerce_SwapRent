import { db } from './firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

/**
 * Guarda un documento en una colección o subcolección específica de Firestore.
 *
 * ### Ejemplo de uso:
 * ```javascript
 * import { saveDocument } from './servicesFirebase';
 *
 * const data = { nombre: 'Ejemplo', descripcion: 'Este es un ejemplo' };
 * const path = 'documento';
 *
 * saveDocument(path, data)
 *   .then((docId) => {
 *     console.log('Documento creado con ID:', docId);
 *   })
 *   .catch((error) => {
 *     console.error('Error al guardar el documento:', error);
 *   });
 * ```
 *
 * @param {string} path - Ruta de la colección o subcolección en Firestore.
 *   - Ejemplo: `'documento'` o `'documento/{docId}/listado_maestro'`.
 * @param {Record<string, any>} data - Objeto con los datos que se desean guardar en el documento.
 *   - Ejemplo: `{ nombre: 'Ejemplo', descripcion: 'Este es un ejemplo' }`.
 * @returns {Promise<string>} - Una promesa que resuelve con el ID del documento creado.
 * @throws {Error} - Lanza un error si ocurre algún problema al guardar el documento.
 */
export const saveDocument = async (path: string, data: Record<string, any>): Promise<string> => {
  try {
    console.log('Ruta de la colección:', path);
    console.log('Datos a guardar:', data);

    // Referencia a la colección en Firestore
    const collectionRef = collection(db, path);

    // Agrega un nuevo documento a la colección
    const docRef = await addDoc(collectionRef, data);

    console.log('Documento guardado con ID:', docRef.id);

    // Retorna el ID del documento creado
    return docRef.id;
  } catch (error) {
    console.error('Error al guardar el documento:', error);

    // Lanza el error para que pueda ser manejado por el llamador
    throw error;
  }
};

/**
 * Obtiene todos los productos desde la colección "productos" en Firestore.
 * @returns {Promise<Array>} - Una promesa que resuelve con un array de productos.
 */
export const getProducts = async (): Promise<any[]> => {
  try {
    const collectionRef = collection(db, 'productos'); // Referencia a la colección "productos"
    const querySnapshot = await getDocs(collectionRef);
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return products;
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    throw error;
  }
};