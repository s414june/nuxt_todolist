<template>
  <div>
    <div class="container">
      <h1 class="text-center text-primary title my-5">
        Nuxt Server To Do List
      </h1>
      <div class="d-flex flex-column align-center">
        <div class="list-box">
          <div class="d-flex justify-center align-center">
            <v-text-field
              v-model="inputTodo"
              label="待辦事項"
              variant="outlined"
              color="grey"
              @keydown.enter="addItem()"
            ></v-text-field>
            <v-btn
              variant="tonal"
              class="mx-2"
              color="primary"
              @click="addItem()"
            >
              加入
            </v-btn>
          </div>
          <v-data-table :headers="headers" :items="list">
            <template v-slot:item.todo="{ item }">
              <p
                :class="{ 'done-item': item.done }"
                @click="doneItem(item)"
                v-show="!item.editing"
              >
                {{ item.todo }}
              </p>
              <v-text-field
                v-show="item.editing"
                v-model="item.todo"
                variant="outlined"
                color="grey"
              ></v-text-field>
            </template>
            <template v-slot:item.operate="{ item, index }">
              <v-icon class="me-2" size="small" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon size="small" @click="deleteItem(index)">
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const headers = ref([
  {
    title: "事項",
    key: "todo",
  },
  {
    title: "操作",
    key: "operate",
    width: "100px",
  },
]);
const list: Ref<TodoItem[]> = ref([]);
const { data } = await useFetch("/api/get_todo");
list.value = data.value;
const inputTodo = ref("");
function addItem() {
  if (inputTodo.value === "") return;
  list.value.push({
    todo: inputTodo.value,
    done: false,
    editing: false,
  });
  inputTodo.value = "";
  update();
}
function editItem(item: TodoItem) {
  item.editing = !item.editing;
  if (!item.editing) update();
}
function deleteItem(index: number) {
  list.value.splice(index, 1);
  update();
}

function doneItem(item: TodoItem) {
  item.done = !item.done;
  update();
}

interface TodoItem {
  todo: string;
  done: Boolean;
  editing: Boolean;
}

async function update() {
  const _list = toRaw(list.value);
  const data  = await $fetch("/api/update", {
    method: "post",
    body: _list,
  });
  console.log(data)
}
</script>

<style scoped lang="scss">
.container {
  margin: 3rem;
}
.title {
  font-size: 24px;
}
.list-box {
  width: 350px;
}
:deep(.v-text-field .v-input__details) {
  display: none !important;
}
.done-item {
  text-decoration: line-through;
}
</style>
