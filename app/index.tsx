import { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  useColorScheme,
  FlatList,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { SwipeListView } from "react-native-swipe-list-view";
import { MaterialIcons } from "@expo/vector-icons";
import { getTasks, toggleComplete, deleteTask } from "../lib/db";
import { lightTheme, darkTheme } from "../lib/themes";
import dayjs from "dayjs";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [filter, setFilter] = useState<"all" | "todo" | "done">("all");
  const [sortBy, setSortBy] = useState<"priority" | "due">("priority");
  const router = useRouter();

  const scheme = useColorScheme();
  const theme = scheme === "dark" ? darkTheme : lightTheme;

  const loadTasks = async () => {
    const rows = await getTasks();
    setTasks(rows);
  };

  useFocusEffect(() => {
    loadTasks();
  });

  const handleToggle = async (id: number, current: boolean) => {
    await toggleComplete(id, !current);
    loadTasks();
  };

  const filteredTasks = useMemo(() => {
    let result = [...tasks];
    if (filter === "todo") result = result.filter((t) => !t.completed);
    if (filter === "done") result = result.filter((t) => t.completed);

    if (sortBy === "priority") {
      const order = { high: 0, medium: 1, low: 2 } as const;
      result.sort(
        (a, b) =>
          order[a.priority as keyof typeof order] -
          order[b.priority as keyof typeof order]
      );
    } else if (sortBy === "due") {
      result.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
    }

    return result;
  }, [tasks, filter, sortBy]);

  const renderHiddenItem = ({ item }: { item: any }) => (
    <View style={[styles.rowBack, { backgroundColor: "#e53935" }]}>
      <Pressable
        style={styles.deleteSwipe}
        onPress={async () => {
          await deleteTask(item.id);
          loadTasks();
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>刪除</Text>
      </Pressable>
    </View>
  );

  const renderItem = ({
    item,
  }: {
    item: {
      id: number;
      name: string;
      priority: "high" | "medium" | "low";
      completed: boolean;
      dueDate?: string;
    };
  }) => {
    const isCompleted = Boolean(item.completed);
    return (
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Pressable
          style={[
            styles.circle,
            {
              backgroundColor: isCompleted
                ? theme.priority[item.priority as "high" | "medium" | "low"]
                : theme.priority[item.priority] + "55",
            },
          ]}
          onPress={() => handleToggle(item.id, item.completed)}
        >
          {isCompleted && <MaterialIcons name="check" size={16} color="#fff" />}
        </Pressable>

        <Pressable
          style={styles.textArea}
          onPress={() =>
            router.push({
              pathname: "/edit/[id]",
              params: { id: String(item.id) },
            })
          }
        >
          <Text style={[styles.name, { color: theme.text }]}>{item.name}</Text>
          <Text style={[styles.priorityTag, { color: theme.secondaryText }]}>
            {item.priority.toUpperCase()}
          </Text>
          {item.dueDate && (
            <Text style={[styles.dueDate, { color: theme.secondaryText }]}>
              📅 {dayjs(item.dueDate).format("YYYY/MM/DD")}
            </Text>
          )}
        </Pressable>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>My To Do List</Text>

      <View style={styles.controls}>
        <View style={styles.filterGroup}>
          {["all", "todo", "done"].map((type) => {
            const isActive = filter === type;
            return (
              <Pressable
                key={type}
                style={[
                  styles.filterButton,
                  {
                    backgroundColor: isActive
                      ? theme.accent + "22"
                      : "transparent",
                    borderColor: theme.accent,
                  },
                ]}
                onPress={() => setFilter(type as any)}
              >
                <Text
                  style={{
                    color: isActive ? theme.accent : theme.secondaryText,
                    fontSize: 13,
                    fontWeight: isActive ? "700" : "500",
                  }}
                >
                  {type === "all"
                    ? "全部"
                    : type === "todo"
                    ? "未完成"
                    : "已完成"}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.filterGroup}>
          {["priority", "due"].map((sort) => {
            const isActive = sortBy === sort;
            return (
              <Pressable
                key={sort}
                style={[
                  styles.filterButton,
                  {
                    backgroundColor: isActive
                      ? theme.accent + "22"
                      : "transparent",
                    borderColor: theme.accent,
                  },
                ]}
                onPress={() => setSortBy(sort as any)}
              >
                <Text
                  style={{
                    color: isActive ? theme.accent : theme.secondaryText,
                    fontSize: 13,
                    fontWeight: isActive ? "700" : "500",
                  }}
                >
                  {sort === "priority" ? "依優先順序" : "依截止日期"}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <SwipeListView
        data={filteredTasks}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        keyExtractor={(item) => item.id.toString()}
        rightOpenValue={-75}
        contentContainerStyle={{ paddingBottom: 120 }}
      />

      <Pressable
        style={[styles.fab, { backgroundColor: theme.accent }]}
        onPress={() => router.push("/add")}
      >
        <MaterialIcons name="add" size={28} color="#fff" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
  controls: { marginBottom: 12 },
  filters: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },
  sorters: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },
  selected: {
    fontWeight: "bold",
    color: "#3F51B5",
    borderBottomWidth: 2,
    borderBottomColor: "#3F51B5",
    paddingBottom: 4,
  },
  unselected: {
    color: "#888",
  },
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  textArea: { flex: 1 },
  name: { fontSize: 16, fontWeight: "600" },
  priorityTag: { fontSize: 12, marginTop: 2 },
  dueDate: { fontSize: 12, marginTop: 2 },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },
  rowBack: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
    borderRadius: 10,
    marginBottom: 12,
    paddingRight: 20,
  },
  deleteSwipe: {
    width: 75,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  filterGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  filterButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
  },
});
