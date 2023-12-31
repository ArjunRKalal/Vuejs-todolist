export enum TodoStatus {
    Pending = "Pending",
    InProgress = "InProgress",
    Completed = "Completed"
}

export interface Todo {
    id: number,
    title: string,
    description: string,
    status: TodoStatus
}