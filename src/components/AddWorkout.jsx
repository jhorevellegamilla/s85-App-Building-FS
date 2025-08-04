export default function AddWorkout({ newWorkout, setNewWorkout, addWorkout, error }) {
	return (
		<div className="modal fade" id="workoutModal" tabIndex="-1" aria-hidden="true">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Add Workout</h5>
						<button type="button" className="btn-close" data-bs-dismiss="modal"></button>
					</div>
					<div className="modal-body">
						<input
							type="text"
							className="form-control mb-2"
							placeholder="Workout Name"
							value={newWorkout.name}
							onChange={(e) => setNewWorkout({ ...newWorkout, name: e.target.value })}
						/>
						<input
							type="number"
							className="form-control mb-2"
							placeholder="Duration (in mins)"
							value={newWorkout.duration}
							onChange={(e) => setNewWorkout({ ...newWorkout, duration: e.target.value })}
						/>
						{error && <p className="text-danger">{error}</p>}
					</div>
					<div className="modal-footer">
						<button className="btn btn-primary" onClick={addWorkout}>Save</button>
						<button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>
	);
}
