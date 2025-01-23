import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const createUser = async (name: string) => {
  const response = await fetch(
    "https://6752d87bf3754fcea7b9cea0.mockapi.io/users",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        avatar: `https://gravatar.com/avatar/${Math.random()
          .toString(36)
          .substring(2)}?s=400&d=robohash&r=x`,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Erreur lors de la création de l'utilisateur");
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
      <h1 className="text-3xl font-bold mb-6">Ajouter un Utilisateur</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-medium mb-2"
          >
            Nom
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Entrez le nom de l'utilisateur"
            required
          />
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/users")}
            className="btn btn-secondary"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Création..." : "Créer"}
          </button>
        </div>
        {mutation.isError && (
          <p className="mt-4 text-red-500 text-center">
            Une erreur est survenue lors de la création de l'utilisateur
          </p>
        )}
      </form>
    </>
  );
};

export default UserForm;
