export const addDecimals = (num) => {
	return Math.round((num * 100) / 100).toFixed(2);
};

// export const getTokenFromLocalStorage = () => {
// 	return localStorage.getItem("userInfo");
// };

// utils.js
export function getTokenFromLocalStorage() {
	const userInfoString = localStorage.getItem("userInfo");
	if (!userInfoString) return null;

	try {
		const userInfo = JSON.parse(userInfoString);
		return userInfo.userToken || null;
	} catch (error) {
		console.error("Error parsing userInfo from localStorage:", error);
		return null;
	}
}

// Function to format the date
export const formatDate = (dateString) => {
	const options = { year: "numeric", month: "long", day: "numeric" };
	return new Date(dateString).toLocaleDateString(undefined, options);
};
