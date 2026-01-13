export const checkoutCode = `app.post('/api/checkout', async (req, res) => {
  try {
    const cart = [
      { id: "prod_e7dd3e66", quantity: 1 },
      {
        name: "Priority Shipping",
        price: 1500,
        quantity: 1
      }
    ];

    const { clientSecret, amount } = await soteria.createCheckout(cart);

    res.json({
      clientSecret: clientSecret,
      url: soteria.getCheckoutUrl(clientSecret)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});`;

export const installCode = `npm i https://github.com/giorgigelashvili12/Soteria-SDK crypto`;

export const importCodeJS = `import { soteria } from 'soteria-sdk';`;

export const configCode = `soteria.configure(
    "mk_...",
    "sk_..."
);`;
export const config1 = `soteria.configure(passkey, secretKey);`;
export const getCheckoutUrl = `soteria.getCheckoutUrl(clientSecret)`;

export const createCheckout = `const { clientSecret, amount } = await soteria.createCheckout(cart);`;

export const syncCatalog = `const myProducts = [
  { id: "coffee-01", name: "Americano", price: 450 },
  { id: "coffee-02", name: "Latte", price: 600 }
];

await soteria.syncCatalog(myProducts);`;

export const deprecated1 = `await soteria.createIntent(config)`;

export const deprecated2 = `import { soteria } from '../src/node/js/index.js';

soteria.configure(passkey, secretKey);

const config = {
  amount: 2000,
  currency: "GEL",
  description: "Order #12345",
  metadata: {
    customer_name: "Giorgi",
    order_id: "SHP-99"
  }
};

try {
  const result = await soteria.createIntent(config);
  console.log("Intent Created:", result.clientSecret);
} catch (error) {
  console.error("Failed to create intent", error);
}`;

export const frontModule = `import { soteria } from './soteria-sdk/src/web/index.js';

const handlePayment = async () => {
  try {
    const response = await fetch("url-to-your-server/buy-item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart })
    });

    const data = await response.json();
    if (data.clientSecret) {
      soteria.redirectToCheckout(data.clientSecret);
    }

    } catch (e) {
      console.error("Payment failed", e);
    }
  };`;

export const frontSnippet = `await soteria.redirectToCheckout(clientSecret);`;

export const showcase1 = `return (
...
  <button onClick={handlePayment} className="bg-emerald-500 hover:bg-emerald-400 ...">
    Pay with Soteria
  </button>
...
)`;

export const deleteProduct = `await soteria.deleteProduct(productId);`;

export const updateProduct = `await soteria.editProduct({
  id: productId,
  name: "Product Name",
  price: 49.99,
  currency: "GEL",
  sku: "PRODUCT-01",
  description: "a cool description for a cool product"
});`;

export const getParamEmpty = `await soteria.getProduct()`;
export const getParamGiven = `await soteria.getProduct({ id: productId })`;

export const deleteUsage = `app.delete('/delete', async (req, res) => {
    try {
        const response = await soteria.deleteProduct("prod_...");
        return res.json({ status: "success", response });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});`;

export const updateUsage = `app.patch('/product/edit', async (req, res) => {
    try {
        const result = await soteria.editProduct({
            id: "prod_...",
            name: "name",
            price: 49.99,
            currency: "GEL",
            sku: "NAME-01",
            description: "description"
        });

        return res.json({ msg: "Edit successful", result });
    } catch (error) {
        return res.status(500).json({err: error});
    }
});`;

export const getParamEmptyUsage = `app.get('/', async (req, res) => {
    try {
        const data = await soteria.getProduct({ id: "prod_..." });
        return res.json(data);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});`;

export const getParamGivenUsage = `app.get('/', async (req, res) => {
    try {
        const data = await soteria.getProduct();
        return res.json(data);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});`;
