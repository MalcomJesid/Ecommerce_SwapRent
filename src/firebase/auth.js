// Importamos las dependencias necesarias de Firebase
import { auth, db } from './firebase' // Autenticación y base de datos
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  browserLocalPersistence, 
  setPersistence, 
  updateProfile 
} from 'firebase/auth' // Funciones de autenticación de Firebase
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  query, 
  where, 
  getDocs 
} from 'firebase/firestore' // Funciones de Firestore

// Servicio de autenticación
export const AuthService = {
  /**
   * Capitaliza el nombre de usuario.
   * Convierte la primera letra de cada palabra en mayúscula y el resto en minúscula.
   * @param {string} username - Nombre de usuario a capitalizar.
   * @returns {string} Nombre de usuario capitalizado.
   */
  capitalizeUsername(username) {
    if (!username || username.trim().length === 0) {
      throw new Error("El nombre de usuario no puede estar vacío.");
    }
    const cleanUsername = username.trim().replace(/\s+/g, ' ');
    return cleanUsername
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  },

  /**
   * Verifica si un nombre de usuario ya está registrado en la base de datos.
   * @param {string} username - Nombre de usuario a verificar.
   * @returns {boolean} `true` si el nombre ya está en uso, `false` en caso contrario.
   */
  async isUsernameTaken(username) {
    try {
      const usersRef = collection(db, 'jugadores');
      const q = query(usersRef, where('nombre', '==', this.capitalizeUsername(username)));
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error('Error checking username:', error);
      throw error;
    }
  },

  /**
   * Registra un nuevo usuario en Firebase Authentication y Firestore.
   * @param {Object} param0 - Objeto con los datos del usuario.
   * @param {string} param0.email - Correo electrónico del usuario.
   * @param {string} param0.password - Contraseña del usuario.
   * @param {Object} param0.userData - Datos adicionales del usuario.
   * @returns {Object} Resultado del registro.
   */
  async register({ email, password, userData }) {
    try {
      const capitalizedName = this.capitalizeUsername(userData.nombre);

      // Verificamos si el nombre ya existe
      const isNameTaken = await this.isUsernameTaken(userData.nombre);
      if (isNameTaken) {
        return {
          success: false,
          error: 'Este nombre de usuario ya está en uso',
          code: 'name-already-in-use'
        };
      }

      // Creamos el usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Actualizamos el perfil del usuario con el nombre capitalizado
      await updateProfile(userCredential.user, {
        displayName: capitalizedName
      });

      // Guardamos el perfil del usuario en Firestore
      await this.createUserProfile(userCredential.user.uid, { 
        ...userData,
        nombre: capitalizedName,
        email 
      });

      return {
        user: userCredential.user,
        success: true
      };
    } catch (error) {
      return this.handleAuthError(error);
    }
  },

  /**
   * Inicia sesión con correo y contraseña.
   * @param {Object} param0 - Objeto con las credenciales del usuario.
   * @param {string} param0.email - Correo electrónico del usuario.
   * @param {string} param0.password - Contraseña del usuario.
   * @returns {Object} Resultado del inicio de sesión.
   */
  async login({ email, password }) {
    try {
      await setPersistence(auth, browserLocalPersistence); // Mantener la sesión en el navegador
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userProfile = await this.getUserProfile(userCredential.user.uid);
      return {
        user: userCredential.user,
        profile: userProfile,
        success: true
      };
    } catch (error) {
      return this.handleAuthError(error);
    }
  },

  /**
   * Cierra la sesión del usuario actual.
   * @returns {Object} Resultado del cierre de sesión.
   */
  async logout() {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return this.handleAuthError(error);
    }
  },

  /**
   * Observa los cambios en el estado de autenticación del usuario.
   * @param {Function} callback - Función que se ejecuta cuando cambia el estado.
   */
  onAuthStateChange(callback) {
    try {
      return onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userProfile = await this.getUserProfile(user.uid);
          callback({ user, profile: userProfile, loggedIn: true });
        } else {
          callback({ user: null, profile: null, loggedIn: false });
        }
      });
    } catch (error) {
      console.error('Error en el observador de estado de autenticación:', error);
      throw error;
    }
  },

  /**
   * Crea un perfil de usuario en Firestore.
   * @param {string} userId - ID del usuario.
   * @param {Object} userData - Datos del usuario.
   * @returns {Object} Resultado de la operación.
   */
  async createUserProfile(userId, userData) {
    try {
      await setDoc(doc(db, 'usuarios', userId), {
        ...userData,
        // createdAt: new Date().toISOString() // (Opcional) Fecha de creación
      });
      return { success: true };
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }
  },

  /**
   * Obtiene el usuario actual autenticado.
   * @returns {Object|null} Usuario actual o `null` si no hay sesión activa.
   */
  async getCurrentUser() {
    return auth.currentUser;
  },

  /**
   * Obtiene el perfil de un usuario desde Firestore.
   * @param {string} userId - ID del usuario.
   * @returns {Object|null} Perfil del usuario o `null` si no existe.
   */
  async getUserProfile(userId) {
    try {
      const userDoc = await getDoc(doc(db, 'jugadores', userId));
      return userDoc.exists() ? userDoc.data() : null;
    } catch (error) {
      console.error('Error obteniendo el perfil del usuario:', error);
      throw error;
    }
  },

  /**
   * Maneja los errores de autenticación y devuelve un mensaje amigable.
   * @param {Object} error - Objeto de error de Firebase.
   * @returns {Object} Objeto con el mensaje de error y el código.
   */
  handleAuthError(error) {
    const errorMessages = {
      'auth/email-already-in-use': 'Este correo ya está registrado',
      'auth/invalid-email': 'Correo electrónico inválido',
      'auth/operation-not-allowed': 'Operación no permitida',
      'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
      'auth/user-not-found': 'Usuario no encontrado',
      'auth/wrong-password': 'Contraseña incorrecta',
      'name-already-in-use': 'El nombre de usuario ya fue registrado por otro jugador',
      'auth/invalid-credential': 'Credenciales inválidas, el correo o la contraseña son incorrectos',
      'auth/user-disabled': 'Usuario deshabilitado',
    };

    return {
      success: false,
      error: errorMessages[error.code] || 'Error en la autenticación',
      code: error.code
    };
  }
};