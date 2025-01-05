document.addEventListener("DOMContentLoaded", () => {
    const calendarGrid = document.getElementById("calendarGrid");
    const monthYear = document.getElementById("monthYear");
    const prevMonth = document.getElementById("prevMonth");
    const nextMonth = document.getElementById("nextMonth");
    const popup = document.getElementById("popup");
    const popupContent = document.getElementById("popupContent");
    const popupClose = document.getElementById("popupClose");

    const events = [
        { date: "2024-12-25", title: "Christmas Day" },
        { date: "2024-12-31", title: "New Year's Eve" },
        { date: "2024-12-19", title: "End of School Term" },
        { date: "2024-12-01", title: "Parent-Teacher Meeting" },
    ];

    let currentDate = new Date();

    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        calendarGrid.innerHTML = "";
        monthYear.textContent = `${currentDate.toLocaleString("default", { month: "long" })} ${year}`;

        // Add empty days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement("div");
            calendarGrid.appendChild(emptyCell);
        }

        // Add days with highlights for events
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const cell = document.createElement("div");
            cell.textContent = day;

            const event = events.find(event => event.date === dateStr);
            if (event) {
                cell.classList.add("highlight");
                cell.addEventListener("click", () => showPopup(event.title));
            }

            calendarGrid.appendChild(cell);
        }
    }

    function showPopup(eventTitle) {
        popupContent.textContent = eventTitle;
        popup.style.display = "block";
    }

    function closePopup() {
        popup.style.display = "none";
    }

    popupClose.addEventListener("click", closePopup);

    prevMonth.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonth.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar();
});
