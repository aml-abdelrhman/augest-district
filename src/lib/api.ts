import axios from "axios";

export const api = axios.create({
  baseURL: "https://fakestoreapi.com",
  headers: { "Content-Type": "application/json" },
  timeout: 5000,
});


// export async function getProfile() {
//   try {
//     const res = await api.get("/users/1");
//     const user = res.data;

//     return {
//       firstName: user.name.firstname,
//       lastName: user.name.lastname,
//       email: user.email,
//       phone: user.phone,
//       avatar: "/avatar.png",
//     };
//   } catch (error) {
//     console.error(error);

//     return {
//       firstName: "",
//       lastName: "",
//       email: "",
//       phone: "",
//       avatar: "",
//     };
//   }
// }

// export async function updateProfile(data: any) {
//   try {
//     const res = await api.put("/users/1", {
//       email: data.email,
//       phone: data.phone,
//       name: {
//         firstname: data.firstName,
//         lastname: data.lastName,
//       },
//     });

//     return res.data;
//   } catch (error) {
//     console.error(error);
//   }
// }


// if api contain profile directly:
// export async function getProfile() {
//   const res = await api.get("/profile");
//   return res.data;
// }

// export async function updateProfile(data: any) {
//   const res = await api.put("/profile", data);
//   return res.data;
// } 


// for local storage without api calls:
export async function getProfile() {
  try {
    // لو فيه بيانات محفوظة محليًا
    const savedProfile = localStorage.getItem("profile");

    if (savedProfile) {
      return JSON.parse(savedProfile);
    }

    // غير كده هات من API
    const res = await api.get("/users/1");
    const user = res.data;

    const profile = {
      firstName: user.name.firstname,
      lastName: user.name.lastname,
      email: user.email,
      phone: user.phone,
      avatar: "/avatar.png",
    };

    return profile;
  } catch (error) {
    console.error(error);

    return {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      avatar: "",
    };
  }
}

export async function updateProfile(data: any) {
  try {
    // حفظ في localStorage
    localStorage.setItem("profile", JSON.stringify(data));

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

// api calls for password change
// async function changePassword(currentPassword: string, newPassword: string) {
//   try {
//     const res = await api.put("/change-password", {
//       currentPassword,
//       newPassword,
//     });

//     if (res.data.success) {
//       alert("Password updated successfully");
//     } else {
//       alert(res.data.message || "Error updating password");
//     }
//   } catch (err) {
//     console.error(err);
//     alert("Network error");
//   }
// }

// export default changePassword;


//  API تسجيل الخروج من logoutApi
// export async function logoutApi() {
//   try {
//     // لو السيرفر يحتاج توكن مصادقة
//     const token = localStorage.getItem("token");

//     if (token) {
//       await api.post("/logout", null, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//     }

//     // بعد نجاح الطلب، ننظف localStorage
//     localStorage.removeItem("profile");
//     localStorage.removeItem("password");
//     localStorage.removeItem("rememberEmail");
//     localStorage.removeItem("token");

//     return { success: true, message: "Logged out via API" };
//   } catch (err) {
//     console.error("API Logout failed:", err);
//     return { success: false, message: "Logout failed" };
//   }
// }

//  بدون api >>تسجيل الخروج من التطبيق
export async function logout() {
  try {
    localStorage.removeItem("profile");      // بيانات المستخدم
    localStorage.removeItem("password");     // كلمة المرور (لو مخزنة)
    localStorage.removeItem("rememberEmail");// الايميل المحفوظ
    localStorage.removeItem("token");        // أي توكن موجود
    localStorage.removeItem("resetCode");    // كود إعادة تعيين كلمة المرور لو موجود
    localStorage.removeItem("resetEmail");   // البريد المرتبط بالكود

    return { success: true, message: "Logged out successfully" };
  } catch (err) {
    console.error("Logout failed:", err);
    return { success: false, message: "Logout failed" };
  }
}



// جلب آخر 4 أوردرز لمستخدم معين
export type Order = {
  id: number;
  date: string;
  products: { productId: number; quantity: number; price?: number }[];
  total?: number;
  shipping?: number;
  status: string;
};

export async function getLastOrders(userId: number): Promise<Order[]> {
  try {
    const res = await api.get(`/carts/user/${userId}`);
    const data: Order[] = res.data;

    // جلب بيانات كل منتج لحساب السعر
    const enrichedOrders = await Promise.all(
      data.slice(-4).reverse().map(async (order) => {
        let total = 0;
        const productsWithPrice = await Promise.all(
          order.products.map(async (p) => {
            const prodRes = await api.get(`/products/${p.productId}`);
            const price = prodRes.data.price;
            total += price * p.quantity;
            return { ...p, price };
          })
        );

        const shipping = 5; // مثال، ممكن حسب قواعدك
        return { ...order, products: productsWithPrice, total, shipping };
      })
    );

    return enrichedOrders;
  } catch (err) {
    console.error("Error fetching orders:", err);
    return [];
  }
}


//  API  تسجيل الدخول مستخدم جديد ب
export async function createUser(user: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  try {
    const res = await api.post("/users", {
      name: { firstname: user.firstName, lastname: user.lastName },
      email: user.email,
      password: user.password,
      role: "user",
    });
    return res.data;
  } catch (err: any) {
    console.error("API Error:", err);
    throw err.response?.data || { message: "Network error" };
  }
}

// user login 
export async function loginUser(email: string, password: string) {
  try {
    const res = await api.get("/users");   
    const user = res.data.find(
      (u: any) => u.email === email && u.password === password
    );

    if (!user) throw { message: "Invalid email or password" };

    return {
      id: user.id,
      firstName: user.name.firstname,
      lastName: user.name.lastname,
      email: user.email,
      role: user.role || "user", 
    };
  } catch (err: any) {
    console.error("API Login Error:", err);
    throw err.response?.data || { message: err.message || "Network error" };
  }
}

// get token$ userid for cart provider $layout:
// import jwt_decode from "jwt-decode";

// export async function loginUser(email: string, password: string) {
//   try {
//     const res = await api.post("/login", { email, password });
//     const { token } = res.data; // السيرفر بيرجع JWT
//     localStorage.setItem("token", token); // نخزن التوكن

//     return token;
//   } catch (err: any) {
//     console.error("API Login Error:", err);
//     throw err.response?.data || { message: err.message || "Network error" };
//   }
// }

// // استخراج userId من التوكن
// export function getUserIdFromToken() {
//   const token = localStorage.getItem("token");
//   if (!token) return null;

//   const decoded: { userId: number } = jwt_decode(token); // نفترض السيرفر بيرجع userId في التوكن
//   return decoded.userId;
// }




// // لينك الـ API بتاع Google
// const GOOGLE_LOGIN_API = "https://your-backend.com/auth/google"; // غيري اللينك هنا

// export async function loginWithGoogle(idToken: string) {
//   try {
//     const res = await axios.post(GOOGLE_LOGIN_API, {
//       tokenId: idToken, // الـ idToken اللي جاي من Google Sign-In
//     });

//     // المفروض السيرفر يرجع بيانات المستخدم مباشرة
//     return res.data.user;
//   } catch (err: any) {
//     console.error("Google Login API Error:", err);
//     throw err.response?.data || { message: err.message || "Network error" };
//   }
// }

// إرسال كود إعادة تعيين كلمة المرور(sendResetCode) من api
// export async function sendResetCode(email: string) {
//   try {
//     const res = await api.post("/send-reset-code", { email });
//     return res.data; // ممكن يرجع { success: true, message: "Code sent" }
//   } catch (err: any) {
//     console.error("Error sending reset code:", err);
//     throw err.response?.data || { message: "Network error" };
//   }
// }

// // التحقق من الكود المرسل
// export async function verifyResetCode(code: string) {
//   try {
//     const res = await api.post("/verify-reset-code", { code });
//     return res.data; // ممكن يرجع { success: true, message: "Code verified" }
//   } catch (err: any) {
//     console.error("Error verifying code:", err);
//     throw err.response?.data || { message: "Invalid code" };
//   }
// }

// // مثال: إعادة تعيين كلمة المرور بعد التحقق (اختياري)
// export async function resetPassword(email: string, newPassword: string) {
//   try {
//     const res = await api.post("/reset-password", { email, password: newPassword });
//     return res.data; // { success: true, message: "Password updated" }
//   } catch (err: any) {
//     console.error("Error resetting password:", err);
//     throw err.response?.data || { message: "Network error" };
//   }
// }

// تسجيل الدخول (مثال) بعدها
// export async function loginUser(email: string, password: string) {
//   try {
//     const res = await api.post("/login", { email, password });
//     return res.data; // { token, user }
//   } catch (err: any) {
//     console.error("Login error:", err);
//     throw err.response?.data || { message: "Invalid credentials" };
//   }
// }


    //API حفظ الكود محلياً بدون طلب  
export async function sendResetCode(email: string) {
  try {
    const code = Math.floor(1000 + Math.random() * 9000).toString();

    localStorage.setItem("resetCode", code);
    localStorage.setItem("resetEmail", email);

    console.log("Reset Code:", code); 

    return {
      success: true,
      message: "Verification code sent",
      code,
    };
  } catch (err) {
    throw { message: "Failed to generate code" };
  }
}

    // verifyResetCode ...api محلياً بدون طلب  

export async function verifyResetCode(code: string) {
  const savedCode = localStorage.getItem("resetCode");

  if (code === savedCode) {
    return { success: true, message: "Code verified" };
  }

  throw { message: "Invalid code" };
}

    // resetPassword ...api محلياً بدون طلب  

export async function resetPassword(email: string, newPassword: string) {
  const savedEmail = localStorage.getItem("resetEmail");

  if (email !== savedEmail) {
    throw { message: "Invalid email" };
  }

  return {
    success: true,
    message: "Password updated successfully",
  };
}

// Wishlist from api
// import axios from "axios";

// // نوع العنصر
// export type WishlistItem = {
//   id: string; // أو number API
//   title: string;
//   price: number;
//   image: string;
//   rating?: {
//     rate: number;
//     count: number;
//   };
// };

// export const api = axios.create({
//   baseURL: "https://fakestoreapi.com", // غيّري حسب الـ API الحقيقي
//   headers: { "Content-Type": "application/json" },
//   timeout: 5000,
// });

// // جلب قائمة الأمنيات لمستخدم
// export async function fetchWishlist(token: string | null): Promise<WishlistItem[]> {
//   try {
//     const res = await api.get("/wishlist", {
//       headers: token ? { Authorization: `Bearer ${token}` } : undefined,
//     });
//     return res.data;
//   } catch (err) {
//     console.error("Error fetching wishlist:", err);
//     return [];
//   }
// }

// // إضافة عنصر جديد للقائمة
// export async function addWishlistItem(token: string | null, item: WishlistItem): Promise<WishlistItem[]> {
//   try {
//     const res = await api.post("/wishlist", item, {
//       headers: token ? { Authorization: `Bearer ${token}` } : undefined,
//     });
//     return res.data;
//   } catch (err) {
//     console.error("Error adding wishlist item:", err);
//     throw err;
//   }
// }

// // حذف عنصر من القائمة
// export async function removeWishlistItem(token: string | null, id: string | number): Promise<WishlistItem[]> {
//   try {
//     const res = await api.delete(`/wishlist/${id}`, {
//       headers: token ? { Authorization: `Bearer ${token}` } : undefined,
//     });
//     return res.data;
//   } catch (err) {
//     console.error("Error removing wishlist item:", err);
//     throw err;
//   }
// }

// // مسح كل القائمة
// export async function clearWishlistApi(token: string | null): Promise<WishlistItem[]> {
//   try {
//     const res = await api.delete("/wishlist", {
//       headers: token ? { Authorization: `Bearer ${token}` } : undefined,
//     });
//     return res.data;
//   } catch (err) {
//     console.error("Error clearing wishlist:", err);
//     throw err;
//   }
// }
// ويتم استرادهم ف الهوك 


// ------------------ Cart API ------------------
// Product type
export type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category?: string;
};

// Cart item type
export type CartItem = Product & { quantity: number, color?:string, size?:string};

// Products
export async function getProducts(): Promise<Product[]> {
  try {
    const res = await api.get("/products");
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getProductById(id: number) {
  try {
    const res = await api.get(`/products/${id}`);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch product by ID:", err);
    return null;
  }
}

// export async function getProductById(id: string | number): Promise<Product | null> {
//   try {
//     const res = await api.get(`/products/${id}`);
//     return res.data;
//   } catch (err) {
//     console.error("Failed to fetch product by ID:", err);
//     return null;
//   }
// }

// Cart API
export async function addCartItem(userId: number, product: Omit<CartItem, "quantity">) {
  return api.post(`/carts`, {
    userId,
    date: new Date().toISOString(),
    products: [{ productId: product.id, quantity: 1 }],
  });
}

export async function updateCartItem(userId: number, productId: number, quantity: number) {
  return api.put(`/carts/${userId}`, { products: [{ productId, quantity }] });
}

export async function removeCartItem(userId: number, productId: number) {
  return api.delete(`/carts/${userId}/products/${productId}`);
}

export async function clearCartApi(userId: number) {
  return api.delete(`/carts/${userId}`);
}
// checkout post to api:
type OrderPayload = {
  userId: number;
  date: string;
  products: { productId: number; quantity: number }[];
  billing: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company?: string;
    country?: string;
    city?: string;
    street?: string;
    state?: string;
    houseNumber?: string;
    zipCode?: string;
  };
  paymentMethod: string;
  shippingCost: number;
  discount?: number;
  total: number;
};

export async function placeOrder(userId: number, items: CartItem[], billingData: any, paymentMethod: string, discountValue: number, shippingCost: number) {
  try {
    const payload: OrderPayload = {
      userId,
      date: new Date().toISOString(),
      products: items.map((i) => ({ productId: i.id, quantity: i.quantity })),
      billing: billingData,
      paymentMethod,
      shippingCost,
      discount: discountValue,
      total: items.reduce((sum, i) => sum + i.price * i.quantity, 0) + shippingCost - discountValue,
    };

    const res = await api.post(`/carts`, payload); // FakeStore API بيقبل /carts
    return res.data; 
  } catch (err) {
    console.error("Error placing order:", err);
    throw err;
  }
}