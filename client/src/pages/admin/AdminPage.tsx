import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersData } from "../../redux/thunk/userThunks";
import { getAllProjects, deleteProject } from "../../redux/thunk/projectThunks";
import { getAllComments, deleteComment } from "../../redux/thunk/commentThunks";
import { RootState } from "../../redux/store/store";
import { getRecentActivity } from "../../redux/thunk/recentActivityThunks";
import { useNavigate } from "react-router-dom";

interface Stat {
  id: number;
  name: string;
  value: string;
}

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("users");
  const [stats, setStats] = useState<Stat[]>([]);

  const users = useSelector((state: RootState) => state.user);
  const projects = useSelector((state: RootState) => state.project);
  const comments = useSelector((state: RootState) => state.comment);
  const recentActivities = useSelector(
    (state: RootState) => state.recentActivity
  );

  useEffect(() => {
    dispatch(fetchUsersData());
    dispatch(getAllProjects());
    dispatch(getAllComments());
    dispatch(getRecentActivity());
  }, [dispatch]);

  useEffect(() => {
    if (users.data?.data?.users && projects.data && comments.data) {
      setStats([
        {
          id: 1,
          name: "Users",
          value: users.data.data.users.length.toString(),
        },
        { id: 2, name: "Projects", value: projects.data.length.toString() },
        { id: 3, name: "Comments", value: comments.data.length.toString() },
      ]);
    }
  }, [users, projects, comments]);

  const handleDeleteProject = (projectId: string) => {
    dispatch(deleteProject(projectId))
      .unwrap()
      .then(() => {
        dispatch(getAllProjects());
        dispatch(getRecentActivity());
      })
      .catch((error) => {});
  };

  const handleDeleteComment = (commentId: string) => {
    dispatch(deleteComment(commentId))
      .unwrap()
      .then(() => {
        dispatch(getAllComments());
        dispatch(getRecentActivity());
      })
      .catch((error) => {});
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Admin Page</h1>

      <div className="flex justify-around mb-8">
        {stats.map((stat) => (
          <div key={stat.id} className="flex flex-col items-center">
            <div
              className={`w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl ${
                stat.id === 1
                  ? "bg-blue-500"
                  : stat.id === 2
                  ? "bg-red-500"
                  : "bg-green-500"
              }`}
            >
              {stat.value}
            </div>
            <p className="mt-2 text-gray-700">{stat.name}</p>
          </div>
        ))}
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Recent Activities
        </h2>
        {recentActivities.status === "loading" && <p>Loading...</p>}
        {recentActivities.status === "failed" && (
          <p>{recentActivities.error}</p>
        )}
        <ul>
          {recentActivities.data.map((activity) => (
            <li key={activity._id} className="mb-2">
              <p
                className={`text-gray-600 ${
                  activity.type === "project" ? "font-bold" : ""
                }`}
              >
                {activity.description}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <nav className="flex justify-around mb-4">
          <button
            className={`px-4 py-2 ${
              activeTab === "users" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("users")}
          >
            Users
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "projects"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("projects")}
          >
            Projects
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "comments"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("comments")}
          >
            Comments
          </button>
        </nav>
        {activeTab === "users" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Users</h2>
            <ul>
              {users.data?.data?.users?.map((user) => (
                <li key={user.id} className="mb-2">
                  <p>{user.userName}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        {activeTab === "projects" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Projects</h2>
            <ul>
              {projects.data.map((project) => (
                <li
                  key={project._id}
                  className="mb-2 flex justify-between items-center"
                >
                  <p>{project.title}</p>
                  <p>{project.owner.userName}</p>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleDeleteProject(project._id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {activeTab === "comments" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Comments</h2>
            <ul>
              {comments.data.map((comment) => (
                <li
                  key={comment._id}
                  className="mb-2 flex justify-between items-center"
                >
                  <p>{comment.project.title}</p>
                  <p>{comment.content}</p>
                  <p>{comment.rating}</p>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleDeleteComment(comment._id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
