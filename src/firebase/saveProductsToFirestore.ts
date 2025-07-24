import { db } from "./firebase"; // Importa la configuración de Firebase
import { collection, addDoc } from "firebase/firestore";

/**
 * Lista de productos para guardar en Firestore.
 */
const productos = [
  {
    id: "1",
    name: "Mesa de lujo + 6 sillas",
    pricePerDay: 65500,
    description: "Mesa de lujo con 6 sillas para reuniones especiales.",
    image: "/src/assets/product/mesas-con6sillas.png",
    category: "Muebles",
    shipping: "Envío gratis",
  },
  {
    id: "2",
    name: "Vestido de gala",
    pricePerDay: 45000,
    description: "Vestido elegante para eventos especiales.",
    image: "/src/assets/product/vestido.png",
    category: "Moda",
    shipping: "Envío gratis",
  },
  {
    id: "3",
    name: "Auto deportivo",
    pricePerDay: 150000,
    description: "Auto deportivo de lujo para ocasiones especiales.",
    image: "/src/assets/product/auto.png",
    category: "Vehículos",
    shipping: "Envío gratis",
  },
  {
    id: "4",
    name: "Cuponera de descuentos",
    pricePerDay: 10000,
    description: "Cuponera con descuentos exclusivos para tus compras.",
    image: "/src/assets/product/cupon.png",
    category: "Promociones",
    shipping: "Envío gratis",
  },
  {
    id: "5",
    name: "Mesa plegable",
    pricePerDay: 30000,
    description: "Mesa plegable ideal para eventos y reuniones.",
    image: "/src/assets/product/mesas.png",
    category: "Muebles",
    shipping: "Envío gratis",
  },
];

/**
 * Guarda los productos en la colección "productos" de Firestore.
 */
const saveProductsToFirestore = async () => {
  try {
    const collectionRef = collection(db, "productos"); // Referencia a la colección "productos"

    for (const producto of productos) {
      const docRef = await addDoc(collectionRef, producto);
      console.log(`Producto guardado con ID: ${docRef.id}`);
    }

    console.log("Todos los productos se han guardado correctamente.");
  } catch (error) {
    console.error("Error al guardar los productos:", error);
  }
};

export default saveProductsToFirestore;