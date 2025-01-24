import { useQuery } from "@tanstack/react-query";
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

const UserList = () => {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

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
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
          >
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
    </>
  );
};

export default UserList;
