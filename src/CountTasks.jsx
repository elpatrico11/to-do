import React from 'react';

export default function CountTasks({ tasks }) {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <p className="text-center fw-bold">Total tasks: <span className="badge bg-primary">{tasks.length}</span></p>
                </div>
            </div>
        </div>
    );
}
