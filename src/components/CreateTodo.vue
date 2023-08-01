<script setup lang="ts">
import useTodos from '@/stores/useTodos';
import type { TodoStatus, Todo } from '@/types';
import { reactive, ref } from 'vue';

interface Props {
    status: TodoStatus
}

const props = defineProps<Props>();

const shouldDisplayForm = ref(false);
const { addNewTodo } = useTodos();

const newTodo = reactive<Omit<Todo, "id">>({
    title: "",
    description: "",
    status: props.status,
})

const onResetForm = () => {
    shouldDisplayForm.value = false;
    newTodo.title = "";
    newTodo.description = "";
}

const handleOnSubmit = () => {
    // add new to do
    addNewTodo({id: Math.random() * 10000000000 , ...newTodo})
    onResetForm();
}

</script>

<template>
    <div>
        <h3 v-if="!shouldDisplayForm" @click="shouldDisplayForm = !shouldDisplayForm">Add New</h3>
        <template v-else>
            <form @submit.prevent="handleOnSubmit">
                <div>
                    <input type="text" placeholder="Title" v-model="newTodo.title" />
                </div>
                <div>
                    <textarea type="text" placeholder="Description" v-model="newTodo.description">
                    </textarea>
                </div>
                <button type="submit">Submit</button>
                <button type="button" @click="onResetForm">Cancel</button>
            </form>
        </template>
    </div>
</template>