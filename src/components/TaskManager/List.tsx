import React from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";

import Item from "@/components/TaskManager/Item";

import { useTaskManagerStore } from "@/store";

const List = () => {
  const { tasks, activeFilter } = useTaskManagerStore((state) => state);

  const filteredTasks = tasks.filter((task) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "completed") return task.completed;
    if (activeFilter === "pending") return !task.completed;
    return false;
  });

  return (
    <motion.ul
      className="overflow-hidden"
      animate={{
        height: `${filteredTasks.length * 65}px`,
        transition: { delay: 0.15 },
      }}
      layout
    >
      <AnimatePresence>
        <LayoutGroup>
          {filteredTasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ x: -100, opacity: 0 }}
              exit={{ y: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
              layout
            >
              <Item task={task} />
            </motion.div>
          ))}
        </LayoutGroup>
      </AnimatePresence>
    </motion.ul>
  );
};

export default List;
