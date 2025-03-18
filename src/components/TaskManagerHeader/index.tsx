const NOON = 12;
const AFTERNOON = 18;

const TaskManagerHeader = () => {
  const getDateInfo = () => {
    const date = new Date();
    const month = date.getMonth();
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    return {
      month: months[month],
      day: date.getDate()
    };
  }

  const renderGreeting = () => {
    const date = new Date();
    const hours = date.getHours();
    if (hours < NOON) {
      return "Good Morning.";
    } else if (hours < AFTERNOON) {
      return "Good Afternoon.";
    } else {
      return "Good Evening.";
    }
  }

  return (
    <div className="min-w-full flex items-center  justify-center">
      <div className="font-bold">
        <p className="text-xl">{getDateInfo().month}</p>
        <p>{getDateInfo().day}</p>
      </div>
      <div className="text-left ml-6">
        <h2 className="text-4xl font-bold">{renderGreeting()}</h2>
        <h3 className="text-2xl font-bold text-gray-500">See your plan for today :)</h3>
      </div>
    </div>
  )
};

export default TaskManagerHeader;