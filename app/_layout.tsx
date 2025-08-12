// import { Stack } from "expo-router";
// import "../global.css";
// // addign the other state hooks to
// import { useEffect } from "react";
// import { runWebOnlyFeatures } from "../utils/webSpecificFeatures";

// export default function RootLayout() {
//   // state

//   useEffect(() => {
//     const cleanup = runWebOnlyFeatures();
//     return cleanup; //stop the event listeners
//   }, []);

//   return (
//     <Stack>
//       <Stack.Screen name="index" options={{ title: "Tasks" }} />
//       <Stack.Screen name="add-task" options={{ title: "Add Task" }} />
//       {/* <Stack.Screen name="edit-task" options={{ title: "Edit Task" }} /> */}
//     </Stack>
//   );
// }
// app/_layout.tsx
import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack />;
}
