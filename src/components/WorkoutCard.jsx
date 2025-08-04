import { NavLink } from 'react-router-dom';

export default function WorkoutCard({ workout }) {
	return (
		<div className="col-md-4 mb-3">
			<div className="card">
				<div className="card-body">
					<h5 className="card-title">{workout.name}</h5>
					<p className="card-text">
						Duration: {workout.duration} mins<br />
						Status: {workout.status}<br />
						Added: {new Date(workout.dateAdded).toLocaleDateString()}
					</p>
				</div>
			</div>
		</div>
	);
}
