import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const createUser = async (name: string) => {
  // Creating a unique identifier based on the name and timestamp to get a different avatar for each user
  const uniqueId = `${name}-${Date.now()}`;

  const response = await fetch(
    "https://6752d87bf3754fcea7b9cea0.mockapi.io/users",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        // Using Robohash directly with the unique identifier
        avatar: `https://robohash.org/${uniqueId}?set=set3&size=200x200`,
        customCreatedAt: new Date().toISOString()
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Error creating user");
  }

  return response.json();
};

const UserForm = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate("/users");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      mutation.mutate(name);
    }
  };

  return (
    <>
      <h1 className="font-bold text-xl text-[#EBBA1E] uppercase">Add a User</h1>
      <h2 className="font-bold mb-6 text-2xl text-white uppercase">
        Add a user to Opus Major
      </h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-white font-medium mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Enter the name of the user"
            required
          />
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/users")}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Creating..." : "Create"}
          </button>
        </div>
        {mutation.isError && (
          <p className="mt-4 text-red-500 text-center">
            An error occurred while creating the user
          </p>
        )}
      </form>
    </>
  );
};

export default UserForm;
