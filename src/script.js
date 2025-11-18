const talks = []; // This will be replaced by the build script

document.addEventListener('DOMContentLoaded', () => {
    const scheduleContainer = document.getElementById('schedule-container');
    const searchInput = document.getElementById('category-search');

    const renderSchedule = (filter = '') => {
        scheduleContainer.innerHTML = '';
        let currentTime = new Date();
        currentTime.setHours(10, 0, 0, 0);

        const filteredTalks = talks.filter(talk => 
            filter === '' || talk.category.some(cat => cat.toLowerCase().includes(filter.toLowerCase()))
        );

        filteredTalks.forEach((talk, index) => {
            const startTime = new Date(currentTime);
            const endTime = new Date(startTime.getTime() + talk.duration * 60000);

            const talkElement = document.createElement('div');
            talkElement.classList.add('schedule-item');
            talkElement.innerHTML = `
                <div class="time">${formatTime(startTime)} - ${formatTime(endTime)}</div>
                <h2>${talk.title}</h2>
                <div class="speakers">By: ${talk.speakers.join(', ')}</div>
                <p>${talk.description}</p>
                <div class="categories">
                    ${talk.category.map(cat => `<span class="category">${cat}</span>`).join('')}
                </div>
            `;
            scheduleContainer.appendChild(talkElement);

            currentTime = new Date(endTime.getTime() + 10 * 60000); // 10 minute break

            if (index === 2) { // Lunch break after the 3rd talk
                const lunchStartTime = new Date(currentTime);
                const lunchEndTime = new Date(lunchStartTime.getTime() + 60 * 60000);
                const lunchElement = document.createElement('div');
                lunchElement.classList.add('schedule-item', 'break-item');
                lunchElement.innerHTML = `
                    <div class="time">${formatTime(lunchStartTime)} - ${formatTime(lunchEndTime)}</div>
                    <h2>Lunch Break</h2>
                `;
                scheduleContainer.appendChild(lunchElement);
                currentTime = lunchEndTime;
            }
        });
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    searchInput.addEventListener('input', (e) => {
        renderSchedule(e.target.value);
    });

    renderSchedule();
});
