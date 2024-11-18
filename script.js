let countdownInterval;  

        document.getElementById("startCountdown").addEventListener("click", function() {  
            const endDateInput = document.getElementById("endDateInput").value;  

            if (endDateInput) {  
                const endDate = new Date(endDateInput + "T23:59:59").getTime(); // Set end time to the end of the day  
                const now = new Date().getTime();  

                // Check if the selected date is in the past  
                if (endDate < now) {  
                    document.getElementById("errorMessage").innerText = "Please select a future date."; // Display error  
                    resetCountdownDisplay(); // Reset display  
                    return; // Exit function early  
                } else {  
                    document.getElementById("errorMessage").innerText = ""; // Clear error message  
                }  

                clearInterval(countdownInterval); // Clear any existing countdown  

                countdownInterval = setInterval(function updateTimer() {  
                    const currentNow = new Date().getTime();  
                    const distancePending = endDate - currentNow;  

                    if (distancePending < 0) {  
                        clearInterval(countdownInterval);  
                        resetCountdownDisplay(); // Reset display upon expiration  
                        document.getElementById("countdown").innerHTML = "EXPIRED";  
                        document.getElementById("progress-bar").style.width = "100%";  
                        return; // Stop further calculations if the time is up  
                    }  

                    const oneDayInMillis = (24 * 60 * 60 * 1000);  
                    const oneHourInMillis = (60 * 60 * 1000);  
                    const oneMinInMillis = (60 * 1000);  
                    const oneSecondInMillis = (1000);  

                    const days = Math.floor(distancePending / oneDayInMillis);  
                    const hrs = Math.floor((distancePending % oneDayInMillis) / oneHourInMillis);  
                    const mins = Math.floor((distancePending % oneHourInMillis) / oneMinInMillis);  
                    const secs = Math.floor((distancePending % oneMinInMillis) / oneSecondInMillis);  

                    document.getElementById("days").innerHTML = days;  
                    document.getElementById("hours").innerHTML = hrs;  
                    document.getElementById("minutes").innerHTML = mins;  
                    document.getElementById("seconds").innerHTML = secs;  

                    // Calculate width percentage for progress bar  
                    const totalDistance = endDate - (new Date()).getTime();  
                    const percentageDistance = ((totalDistance) / (endDate - new Date(endDateInput).getTime())) * 100;  
                    document.getElementById("progress-bar").style.width = percentageDistance + "%";  

                }, 1000);  
            } else {  
                alert("Please select a date.");  
            }  
        });  

        document.getElementById("resetCountdown").addEventListener("click", function() {  
            resetCountdownDisplay();  
        });  

        function resetCountdownDisplay() {  
            clearInterval(countdownInterval); // Stop the countdown  
            document.getElementById("endDateInput").value = ""; // Clear the date input  
            document.getElementById("days").innerHTML = "0";  
            document.getElementById("hours").innerHTML = "0";  
            document.getElementById("minutes").innerHTML = "0";  
            document.getElementById("seconds").innerHTML = "0";  
            document.getElementById("progress-bar").style.width = "0"; // Reset progress bar  
            document.getElementById("countdown").innerHTML = ""; // Clear countdown display  
            document.getElementById("errorMessage").innerText = ""; // Clear error messages  
        }  