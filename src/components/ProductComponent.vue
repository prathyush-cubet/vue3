<template>
  <div class="hello">
    <span><a href="#" @click.prevent="action = 'add'">Add Product</a></span>
    <form @submit.prevent="action == 'add' ? addProduct() : updateProduct()">
      <table v-show="action == 'edit' || action == 'add'">
        <tr>
          <td>Title</td>
          <td>
            <input type="text" v-model="product.title" /> <br />
            <small v-if="error.title" style="color: red">Title requried</small>
          </td>
          <td>Category</td>
          <td>
            <input type="text" v-model="product.category" />
            <br /><small v-if="error.category" style="color: red"
              >Category requried</small
            >
          </td>
          <td>Description</td>
          <td>
            <input type="text" v-model="product.description" /> <br /><small
              v-if="error.description"
              style="color: red"
              >Description requried</small
            >
          </td>
        </tr>
        <tr>
          <td>Price</td>
          <td>
            <input type="text" v-model="product.price" /><br /><small
              v-if="error.price"
              style="color: red"
              >price requried</small
            >
          </td>
          <td>Rating</td>
          <td>
            <input type="text" v-model="product.rating" /> <br /><small
              v-if="error.rating"
              style="color: red"
              >rating requried</small
            >
          </td>
          <td>Stock</td>
          <td>
            <input type="text" v-model="product.stock" /><br /><small
              v-if="error.stock"
              style="color: red"
              >stock requried</small
            >
          </td>
          <td>Brand</td>
          <td>
            <input type="text" v-model="product.brand" /><br /><small
              v-if="error.brand"
              style="color: red"
              >brand requried</small
            >
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <button type="submit">
              {{ action == "add" ? "Add Product" : "Update Product" }}
            </button>
          </td>
        </tr>
      </table>
    </form>
    <table>
      <tr>
        <th>Title</th>
        <th>Category</th>
        <th>Description</th>
        <th>Price</th>
        <th>Rating</th>
        <th>Stock</th>
        <th>Brand</th>
      </tr>
      <tr v-for="(product, index) in products" :key="product.id">
        <td>{{ product.title }}</td>
        <td>{{ product.category }}</td>
        <td>{{ product.description }}</td>
        <td>{{ product.price }}</td>
        <td>{{ product.rating }}</td>
        <td>{{ product.stock }}</td>
        <td>{{ product.brand }}</td>
        <td>
          <a href="#" @click.prevent="editProduct(product)">Edit</a>&nbsp;
          <a href="#" @click.prevent="deleteProduct(product, index)">Delete</a>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ProductComponent",
  props: {
    msg: String,
  },
  data() {
    return {
      product: {
        title: "",
        category: "",
        description: "",
        price: "",
        rating: "",
        brand: "",
        stock: "",
      },
      products: [],
      action: "",
      error: [],
    };
  },
  methods: {
    getProducts() {
      axios
        .get("https://dummyjson.com/products")
        .then((result) => {
          this.products = result.data.products;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    validate() {
      if (this.product.title == "") {
        this.error.title = true;
        this.error.hasError = true;
      } else {
        this.error.title = false;
        this.error.hasError = false;
      }
      if (this.product.category == "") {
        this.error.category = true;
        this.error.hasError = true;
      } else {
        this.error.category = false;
        this.error.hasError = false;
      }
      if (this.product.description == "") {
        this.error.description = true;
        this.error.hasError = true;
      } else {
        this.error.description = false;
        this.error.hasError = false;
      }
      if (this.product.price == "") {
        this.error.price = true;
        this.error.hasError = true;
      } else {
        this.error.price = false;
        this.error.hasError = false;
      }
      if (this.product.rating == "") {
        this.error.rating = true;
        this.error.hasError = true;
      } else {
        this.error.rating = false;
        this.error.hasError = false;
      }

      if (this.product.stock == "") {
        this.error.stock = true;
        this.error.hasError = true;
      } else {
        this.error.stock = false;
        this.error.hasError = false;
      }
      if (this.product.brand == "") {
        this.error.brand = true;
        this.error.hasError = true;
      } else {
        this.error.brand = false;
        this.error.hasError = false;
      }
      if (this.error.hasError == true) {
        return true;
      }
      return false;
    },
    addProduct() {
      if (this.validate()) return false;
      axios
        .post("https://dummyjson.com/products/add", {
          ...this.product,
        })
        .then(() => {
          this.products.unshift(this.product);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editProduct(product) {
      this.product = product;
      this.action = "edit";
    },
    updateProduct() {
      if (this.validate()) return false;
      axios
        .put("https://dummyjson.com/products/" + this.product.id, this.product)
        .then(() => {
          this.products = this.products.map((item) =>
            item.id === this.product.id ? { ...item, ...this.product } : item
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteProduct(product) {
      if (confirm("Sure to delete?")) {
        this.products = this.products.filter((prd) => {
          return prd.id !== product.id;
        });
      }
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
