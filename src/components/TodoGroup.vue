<script setup lang="ts">
import { TodoStatus, type Todo } from '@/types';
import { computed } from 'vue';
import useTodos from '@/stores/useTodos';
import Draggable from "vuedraggable";
import CreateTodo from './CreateTodo.vue';

interface Props {
    status: TodoStatus;
}

const props = defineProps<Props>();

const { getTodoByStatus, removeTodo, updateTodo } = useTodos();
const todoList = getTodoByStatus(props.status);

// const groupLabel = computed(() => {
//     switch (props.status) {
//         case TodoStatus.Pending:
//             return "Pending";
//         case TodoStatus.InProgress:
//             return "In Progress";
//         case TodoStatus.Completed:
//             return "Completed";
//         default:
//             return "Todo Group"
//     }
// })

const groupLabel = {
    [TodoStatus.Pending]: "Pending",
    [TodoStatus.InProgress]: "In Progress",
    [TodoStatus.Completed]: "Completed"
}

const handleOnRemove = (todo: Todo) => {
    removeTodo(todo);
}

const onDraggableChange = (payload: any) => {
    if(payload?.added?.element) {
        updateTodo(payload?.added?.element, props.status)
    }
}
</script>

<template>
    <div class="group-wrapper">
        <h3>
            {{ groupLabel[props.status] }}
        </h3>
        <Draggable class="draggable" :list="todoList" group="todos" itemKey="id" @change="onDraggableChange">
            <template #item="{ element: todo }">
                <li>
                    {{ todo.title }}
                    {{ todo.status }}
                    <span class="delete-icon" @click="handleOnRemove(todo)">X</span>
                    <div>
                        <span class="todo-description">
                            {{ todo.description }}
                        </span>
                    </div>
                </li>
            </template>
        </Draggable>

        <CreateTodo :status="props.status"/>
    </div>
</template>

<style scoped>
.group-wrapper {
    flex: 1;
    padding: 20px;
    background-color: rgb(89, 53, 123);
    color: #fff;
    width: 300px;
}

.group-wrapper li {
    list-style-type: none;
    background-color: aliceblue;
    color: rgb(89, 53, 123);
    padding: 2px 5px;
    cursor: grab;
    margin-bottom: 10px;
}

.todo-description {
    font-size: 12px;
}
.draggable {
  min-height: 200px;
}

.delete-icon{
    float: right;
    cursor: pointer;
}

</style>