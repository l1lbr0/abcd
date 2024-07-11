import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';


const ReferralBackend = ({ selectedButton, id }) => {
    

    const [allData, setAllData] = useState([]); // State to store all fetched data
    const [currentData, setCurrentData] = useState({
        labels: [],
        datasets: [],
    });
    const [currentStartYear, setCurrentStartYear] = useState(0); // Track the starting index of the current dataset

    // Function to fetch data from the backend
    const fetchData = async () => {
        try {
            let data;
            // if (selectedButton === 'SubFirm') {
            //     const response = await fetch(`http://your-backend/api/subfirm/${id}/years`);
            //     data = await response.json();
            // } else if (selectedButton === 'ProductCategory') {
            //     const response = await fetch(`http://your-backend/api/productcategory/${id}/years`);
            //     data = await response.json();
            // } else {
            //     throw new Error('Invalid selectedButton value');
            // }

            // Mock data for demonstration
            data = {
                "Platinum": {
                    "advisor": 68,
                    "average": 44,
                    "highest": 82
                },
                "Gold": {
                    "advisor": 33,
                    "average": 60,
                    "highest": 94
                },
                "Silver": {
                    "advisor": 64,
                    "average": 74,
                    "highest": 100
                },
                "Bronze": {
                    "advisor": 63,
                    "average": 42,
                    "highest": 82
                }
              
            };

            const formattedData = Object.keys(data).map(year => ({
                year,
                advisor: data[year].advisor,
                average: data[year].average,
                highest: data[year].highest,
            }));
            setAllData(formattedData);
            setCurrentStartYear(0); // Initialize the start year index
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Function to update current data based on start year
    const updateCurrentData = (startYear) => {
        const labels = allData.slice(startYear, startYear + 5).map(item => item.year);
        const advisorData = allData.slice(startYear, startYear + 5).map(item => item.advisor);
        const averageData = allData.slice(startYear, startYear + 5).map(item => item.average);
        const highestData = allData.slice(startYear, startYear + 5).map(item => item.highest);

        setCurrentData({
            labels,
            datasets: [
                {
                    label: 'Advisor',
                    data: advisorData,
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                },
                {
                    label: 'Average',
                    data: averageData,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                },
                {
                    label: 'Highest',
                    data: highestData,
                    backgroundColor: 'rgba(255, 206, 86, 0.6)',
                    borderColor: 'rgba(255, 206, 86, 1)',
                    borderWidth: 1,
                },
            ],
        });
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchData();
    }, [selectedButton, id]);

    // Update current data when allData or currentStartYear changes
    useEffect(() => {
        if (allData.length > 0) {
            updateCurrentData(currentStartYear);
        }
    }, [allData, currentStartYear]);

    // Function to handle moving to the next 5 years
    const handleNext = () => {
        if (currentStartYear + 5 < allData.length) {
            setCurrentStartYear(currentStartYear + 5);
        }
    };

    // Function to handle moving to the previous 5 years
    const handlePrevious = () => {
        if (currentStartYear > 0) {
            setCurrentStartYear(currentStartYear - 5);
        }
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Bar
                data={currentData}
                options={{
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Referral Yearly Analysis',
                            padding: {
                                top: 2,
                                bottom: 5,
                            },
                        },
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'AUM (Million $)',
                            },
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Years',
                            },
                        },
                    },
                }}
            />
          
           
        </div>
    );
};

export default ReferralBackend;
