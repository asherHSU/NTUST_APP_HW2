// app/add.tsx
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  Platform,
  useColorScheme,
} from "react-native";
import { useRouter } from "expo-router";
import { addTask } from "../lib/db";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { lightTheme, darkTheme } from "../lib/themes";

const priorities = ["high", "medium", "low"] as const;
type Priority = (typeof priorities)[number];

export default function AddScreen() {
  const router = useRouter();
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? darkTheme : lightTheme;

  const [name, setName] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  const handleAdd = async () => {
    if (!name.trim()) {
      Alert.alert("請輸入任務名稱");
      return;
    }
    await addTask(
      name,
      priority,
      dueDate ? dayjs(dueDate).format("YYYY-MM-DD") : undefined
    );
    router.back();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text></Text>
      <Text style={[styles.title, { color: theme.text }]}>新增任務</Text>

      <Text style={[styles.label, { color: theme.text }]}>任務名稱</Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
            color: theme.text,
          },
        ]}
        placeholder="請輸入..."
        placeholderTextColor={theme.secondaryText}
        value={name}
        onChangeText={setName}
      />

      <Text style={[styles.label, { color: theme.text }]}>優先順序</Text>
      <View style={styles.priorityGroup}>
        {priorities.map((p) => (
          <Pressable
            key={p}
            style={[
              styles.priorityOption,
              {
                borderColor: theme.priority[p],
                backgroundColor:
                  priority === p ? theme.priority[p] : "transparent",
              },
            ]}
            onPress={() => setPriority(p)}
          >
            <Text
              style={{
                color: priority === p ? "#fff" : theme.priority[p],
                fontWeight: "600",
              }}
            >
              {p.toUpperCase()}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={[styles.label, { color: theme.text }]}>截止日期</Text>
      <Pressable
        style={[
          styles.dateButton,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}
        onPress={() => setShowPicker(true)}
      >
        <Text style={{ color: theme.text, fontSize: 16 }}>
          {dueDate ? dayjs(dueDate).format("YYYY/MM/DD") : "選擇日期"}
        </Text>
      </Pressable>

      {showPicker && (
        <DateTimePicker
          value={dueDate || new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "inline" : "default"}
          onChange={(event, date) => {
            setShowPicker(false);
            if (date) setDueDate(date);
          }}
        />
      )}

      <Pressable
        style={[styles.button, { backgroundColor: theme.accent }]}
        onPress={handleAdd}
      >
        <Text style={styles.buttonText}>新增</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1.2,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: 16,
    marginBottom: 24,
  },
  priorityGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  priorityOption: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 4,
    borderRadius: 10,
    borderWidth: 1.5,
    alignItems: "center",
  },
  dateButton: {
    borderWidth: 1.2,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 32,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
