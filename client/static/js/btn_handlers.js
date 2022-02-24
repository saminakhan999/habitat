const {
  createBtn,
  createFrequencySelect,
  renderSubHabitInput
} = require("./handler_helpers");
const { getItem, deleteHabit, updateHabit } = require("./requests");

const handleEdit = async (e) => {
  const wrapper = document.querySelector(".edit_container");
  wrapper.innerHTML = "";
  const habitId = e.currentTarget.id.slice(9);
  const habitObj = await getItem("habits/hab_id", habitId);

  const title = document.createElement("h2");
  title.innerText = `Update Habit`;
  title.classList.add("title", "left_title");
  wrapper.appendChild(title);

  const name = habitObj.name;
  const frequency = habitObj.frequency;
  const subhabits = habitObj.subhabits;

  const newHabitForm = document.createElement("form");
  newHabitForm.id = "newHabitForm";
  newHabitForm.classList.add(habitId);
  wrapper.appendChild(newHabitForm);

  const newHabitName = document.createElement("input");
  newHabitName.id = "newHabitName";
  newHabitName.value = name;
  const habitLabel = document.createElement("label");
  habitLabel.htmlFor = "newHabitName";
  habitLabel.innerText = "What's your habit called?";
  newHabitForm.appendChild(habitLabel);
  newHabitForm.appendChild(newHabitName);

  newHabitForm.append(createFrequencySelect(frequency));

  const addSubHabit = document.createElement("div");
  addSubHabit.textContent = "Add a subhabit? +";
  newHabitForm.append(addSubHabit);
  addSubHabit.addEventListener("click", renderSubHabitInput);
  if (subhabits)
    subhabits.forEach((subhabit) => {
      renderSubHabitInput(subhabit);
    });

  const updateBtn = createBtn();
  updateBtn.addEventListener("click", handleUpdate);
  wrapper.append(updateBtn);
};

const handleUpdate = async (e) => {
  e.preventDefault();
  const form = document.querySelector("#newHabitForm");
  const habitId = parseInt(form.classList[0]);

  const sArray = [];
  document.querySelectorAll(".subHabitName").forEach((h) => {
    sArray.push(h.value);
  });

  const newArray = sArray.map((g) => {
    return { name: g, complete: 0 };
  });

  const farray = [];
  document.querySelectorAll(".days").forEach((f) => {
    if (f.checked) farray.push(1);
    if (!f.checked) farray.push(0);
  });
  const newHabitData = {
    name: document.getElementById("newHabitName").value,
    frequency: farray,
    username: localStorage.getItem("username"),
    subhabits: newArray
  };
  await updateHabit(habitId, newHabitData);
  window.location.reload();
};

const handleDone = async (e) => {
  e.stopPropagation();
  const habit = e.target.parentNode.parentNode;
  habit.classList.toggle("habit_complete");
  const habitId = habit.id.slice(9);
  const habitObj = await getItem("habits/hab_id", habitId);
  const streak = habitObj.streak;

  if (habit.classList.contains("habit_complete")) {
    const newStreak = streak + 1;
    await updateHabit(habitId, { complete: true, streak: newStreak });
    // need to increment the streak
  } else {
    const newStreak = streak - 1;
    await updateHabit(habitId, { complete: "100", streak: newStreak });
    // need to decrement the streak
  }
  window.location.reload();
};

const handleRemoveSubtask = (e) => {
  e.preventDefault();
  e.target.parentNode.remove();
};

const handleDelete = (e) => {
  e.stopPropagation();
  const habitId = e.target.parentNode.id.slice(9);
  deleteHabit(habitId);
};

module.exports = { handleEdit, handleDone, handleDelete, handleRemoveSubtask };
