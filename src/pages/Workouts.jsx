import { useEffect, useState, useContext } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import UserContext from "../context/UserContext";
import api from "../api";

import AddWorkout from "../components/AddWorkout";
import WorkoutCard from "../components/WorkoutCard";

import Modal from 'bootstrap/js/dist/modal';


export default function Workouts() {
	const user = useContext(UserContext);
	const navigate = useNavigate();

	const [workouts, setWorkouts] = useState([]);
	const [newWorkout, setNewWorkout] = useState({ name: "", duration: "" });
	const [error, setError] = useState("");

	const fetchWorkouts = async () => {
		try {
			const res = await api.get("/workouts/getMyWorkouts");
			setWorkouts(res.data);
		} catch (err) {
			console.error("Error fetching workouts:", err);
		}
	};

	const addWorkout = async () => {
		try {
			await api.post("/workouts/addWorkout", newWorkout);
			setNewWorkout({ name: "", duration: "" });
			setError("");
			fetchWorkouts();

			const modalEl = document.getElementById("workoutModal");
			const modal = Modal.getInstance(modalEl) || new Modal(modalEl);
			modal.hide();

		} catch (err) {
			console.error("Error adding workout:", err);
			setError(err.response?.data?.message || "Something went wrong");
		}
	};


	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			navigate("/");
		} else {
			fetchWorkouts();
		}
	}, []);

	return (
		<div className="container py-5">
			<h2 className="mb-4 text-center">My Workouts</h2>

			<button
				className="btn btn-primary mb-3"
				data-bs-toggle="modal"
				data-bs-target="#workoutModal"
			>
				Add Workout
			</button>

			<div className="row">
				{workouts.length > 0 ? (
					workouts.map((w) => (
						<div key={w._id} className="col-md-4 mb-3">
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">{w.name}</h5>
									<p className="card-text">
										Duration: {w.duration} mins<br />
										Status: {w.status}<br />
										Added: {new Date(w.dateAdded).toLocaleDateString()}
									</p>
								</div>
							</div>
						</div>
					))
				) : (
					<p className="text-center">No workouts found.</p>
				)}
			</div>

			<AddWorkout
				newWorkout={newWorkout}
				setNewWorkout={setNewWorkout}
				addWorkout={addWorkout}
				error={error}
			/>
		</div>
	);
}
