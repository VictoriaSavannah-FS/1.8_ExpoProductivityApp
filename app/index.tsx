// import { View, Text } from "react-native";

// export default function Index() {
//   return (
//     <View className="flex-1 items-center justify-center bg-slate-900">
//       <Text className="text-white text-2xl font-bold">It builds! 🎉</Text>
//     </View>
//   );
// }
import React, { useEffect } from "react";
import { View, Text, FlatList, Alert } from "react-native";
import { Link } from "expo-router";
// import { styled } from "nativewind";
import { useTasks } from "../hooks/useTasks";
import { useBreakpoint } from "../hooks/useBreakpoints";
import databaseService from "../services/database";
import Button from "../components/Buttons";
import Card from "../components/Card";
// const View = styled(View);
// const Text = styled(Text);
// const FlatList = styled(FlatList);
export default function TasksScreen() {
  const { tasks, loading, error, deleteTask, updateTask } = useTasks();
  const breakpoint = useBreakpoint();
  useEffect(() => {
    databaseService.init().catch(console.error);
  }, []);
  const handleToggleComplete = async (id: number, completed: boolean) => {
    try {
      await updateTask(id, { completed: !completed });
    } catch (error) {
      Alert.alert("Error", "Failed to update task");
    }
  };
  const handleDeleteTask = async (id: number) => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteTask(id);
          } catch (error) {
            Alert.alert("Error", "Failed to delete task");
          }
        },
      },
    ]);
  };
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };
  const getNumColumns = () => {
    switch (breakpoint) {
      case "xl":
        return 3;
      case "lg":
        return 2;
      default:
        return 1;
    }
  };
  const renderTask = ({ item }) => (
    <View className={`flex-1 ${getNumColumns() > 1 ? "mx-1" : ""} mb-3`}>
      <Card variant="elevated">
        <View className="flex-row justify-between items-start mb-2">
          <Text
            className={`flex-1 text-lg font-semibold ${
              item.completed ? "line-through text-gray-500" : "text-gray-900"
            }`}
          >
            {item.title}
          </Text>
          <Text className="text-2xl ml-2">{item.completed ? "✅" : "⭕"}</Text>
        </View>

        <Text className="text-gray-600 mb-3">{item.description}</Text>

        <View className="flex-row justify-between items-center">
          <Text
            className={`text-sm font-medium ${getPriorityColor(item.priority)}`}
          >
            {item.priority.toUpperCase()}
          </Text>

          <View className="flex-row space-x-2">
            <Button
              title={item.completed ? "Undo" : "Complete"}
              onPress={() => handleToggleComplete(item.id, item.completed)}
              variant="outline"
              size="sm"
            />
            <Button
              title="Delete"
              onPress={() => handleDeleteTask(item.id)}
              variant="secondary"
              size="sm"
            />
          </View>
        </View>
      </Card>
    </View>
  );
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <Text className="text-lg text-gray-600">Loading tasks...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50 px-4">
        <Text className="text-lg text-red-600 text-center">Error: {error}</Text>
      </View>
    );
  }
  return (
    <View className="flex-1 bg-gray-50">
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id?.toString() || ""}
        numColumns={getNumColumns()}
        key={getNumColumns()} // Force re-render when columns change
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center pt-20">
            <Text className="text-xl font-bold text-gray-600 mb-2">
              No tasks yet!
            </Text>
            <Text className="text-gray-500 text-center">
              Create your first task to get started.
            </Text>
          </View>
        }
      />

      <View className="p-4">
        <Link href="/add-task" asChild>
          <Button title="+ Add Task" onPress={() => {}} fullWidth />
        </Link>
      </View>
    </View>
  );
}
