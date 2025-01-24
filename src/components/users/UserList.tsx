import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "../../types";

const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(
    "https://6752d87bf3754fcea7b9cea0.mockapi.io/users"
  );
  if (!response.ok) {
    throw new Error("Error fetching users");
  }
  return response.json();
};

const deleteUser = async (userId: string) => {
  const response = await fetch(
    `https://6752d87bf3754fcea7b9cea0.mockapi.io/users/${userId}`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) {
    throw new Error("Error deleting user");
  }
  return response.json();
};

const UserList = () => {
  const queryClient = useQueryClient();
  const {
    data: users,
    isLoading,
    error,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const deleteUserRequest = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const handleDelete = (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUserRequest.mutate(userId);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        An error occurred while loading the users
      </div>
    );
  }

  return (
    <>
      <h1 className="font-bold text-xl text-[#EBBA1E] uppercase">Users</h1>
      <h2 className="font-bold mb-6 text-2xl text-white uppercase">
        List of all users on Opus Major
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users?.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow relative"
          >
            <button
              onClick={() => handleDelete(user.id)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-2"
              aria-label="Delete user"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
            <img
              src={user.avatar}
              alt={`Avatar de ${user.name}`}
              className="w-20 h-20 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-center">{user.name}</h3>
            <p className="text-gray-500 text-sm text-center mt-2">
              Créé le {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
      {deleteUserRequest.isError && (
        <p className="mt-4 text-red-500 text-center">
          An error occurred while deleting the user
        </p>
      )}
    </>
  );
};

export default UserList;
