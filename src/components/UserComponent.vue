<template>
  <div class="hello">
    <span><a href="#" @click.prevent="action = 'add'">Add User</a></span>
    <form @submit.prevent="action == 'add' ? addUser() : updateUser()">
      <table v-show="action == 'edit' || action == 'add'">
        <tr>
          <td>firstName</td>
          <td>
            <input type="text" v-model="user.firstName" /><br /><small
              v-if="error.firstName"
              style="color: red"
              >firstName requried</small
            >
          </td>
          <td>lastName</td>
          <td>
            <input type="text" v-model="user.lastName" /><br /><small
              v-if="error.lastName"
              style="color: red"
              >lastName requried</small
            >
          </td>
          <td>maidenName</td>
          <td>
            <input type="text" v-model="user.maidenName" /><br /><small
              v-if="error.maidenName"
              style="color: red"
              >maidenName requried</small
            >
          </td>
        </tr>
        <tr>
          <td>age</td>
          <td>
            <input type="text" v-model="user.age" /><br /><small
              v-if="error.age"
              style="color: red"
              >age requried</small
            >
          </td>
          <td>gender</td>
          <td>
            <Select2
              v-model="user.gender"
              :options="ajaxOptions"
              :settings="{ placeholder: 'Gender', width: '100%', ajax: ajax }"
            /><br /><small v-if="error.gender" style="color: red">gender requried</small>
          </td>
          <td>email</td>
          <td>
            <input type="email" v-model="user.email" /> <br /><small
              v-if="error.email"
              style="color: red"
              >email requried</small
            >
          </td>
          <td>phone</td>
          <td>
            <input type="text" v-model="user.phone" /> <br /><small
              v-if="error.phone"
              style="color: red"
              >phone requried</small
            >
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <button type="submit">
              {{ action == "add" ? "Add User" : "Update User" }}
            </button>
          </td>
        </tr>
      </table>
    </form>
    <table width="">
      <tr>
        <th>firstName</th>
        <th>lastName</th>
        <th>maidenName</th>
        <th>Image</th>
        <th>age</th>
        <th>gender</th>
        <th>email</th>
        <th>phone</th>
      </tr>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.firstName }}</td>
        <td>{{ user.lastName }}</td>
        <td>{{ user.maidenName }}</td>
        <td><img :src="user.image" height="30" /></td>
        <td>{{ user.age }}</td>
        <td>
          <!-- <select v-model="user.gender" @change="doAlert($event)">
          <option v-for="(mGender,index) in ['male', 'female']" :key="index" :value="mGender">{{ mGender }}</option>
          </select> -->
          <Select2
            v-model="user.gender"
            :options="ajaxOptions"
            :settings="{ placeholder: 'Gender', width: '100%', ajax: ajax }"
          />
        </td>
        <td>{{ user.email }}</td>
        <td>{{ user.phone }}</td>
        <td>
          <a href="#" @click.prevent="editUser(user)">Edit</a> &nbsp;
          <a href="#" @click.prevent="deleteUser(user)">Delete</a>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import Select2 from "vue3-select2-component";

export default {
  name: "ProductComponent",
  components: { Select2 },
  props: {
    msg: String,
  },
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        maidenName: "",
        age: "",
        gender: "",
        email: "",
        phone: "",
      },
      users: [],
      action: "",
      ajaxOptions: ["male", "female"],
      error: [],
    };
  },
  methods: {
    validate() {
      if (this.user.firstName == "") {
        this.error.firstName = true;
        this.error.hasError = true;
      } else {
        this.error.firstName = false;
        this.error.hasError = false;
      }
      if (this.user.lastName == "") {
        this.error.lastName = true;
        this.error.hasError = true;
      } else {
        this.error.lastName = false;
        this.error.hasError = false;
      }
      if (this.user.maidenName == "") {
        this.error.maidenName = true;
        this.error.hasError = true;
      } else {
        this.error.maidenName = false;
        this.error.hasError = false;
      }
      if (this.user.age == "") {
        this.error.age = true;
        this.error.hasError = true;
      } else {
        this.error.age = false;
        this.error.hasError = false;
      }
      if (this.user.gender == "") {
        this.error.gender = true;
        this.error.hasError = true;
      } else {
        this.error.gender = false;
        this.error.hasError = false;
      }

      if (this.user.email == "") {
        this.error.email = true;
        this.error.hasError = true;
      } else {
        this.error.email = false;
        this.error.hasError = false;
      }
      if (this.user.phone == "") {
        this.error.phone = true;
        this.error.hasError = true;
      } else {
        this.error.phone = false;
        this.error.hasError = false;
      }
      if (this.error.hasError == true) {
        return true;
      }
      return false;
    },

    getUsers() {
      axios
        .get("https://dummyjson.com/users")
        .then((result) => {
          this.users = result.data.users;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    addUser() {
      if (this.validate()) return false;
      axios
        .post("https://dummyjson.com/users/add", {
          ...this.user,
        })
        .then(() => {
          this.users.unshift(this.user);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    editUser(user) {
      this.user = user;
      this.action = "edit";
    },

    updateUser() {
      if (this.validate()) return false;
      axios
        .put("https://dummyjson.com/users/" + this.user.id, {
          ...this.user,
        })
        .then(() => {
          this.users = this.users.map((item) =>
            item.id === this.user.id ? { ...item, ...this.user } : item
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },

    deleteUser(user) {
      if (confirm("Sure to delete?")) {
        axios
          .delete("https://dummyjson.com/users/" + user.id, {
            ...this.user,
          })
          .then(() => {
            this.users = this.users.filter((prd) => {
              return prd.id !== user.id;
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
  mounted() {
    this.getUsers();
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
