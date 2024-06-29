import { FC } from "react";

const Projects: FC = () => {
  return (
    <section className="pt-16 border-t-2 border-gray-200">
      <div className="bg-gray-800 w-3/4 mx-auto p-12 text-gray-100 rounded-lg shadow-lg mb-10">
        <div className="flex justify-between mb-8">
          <h1 className="text-xl">Name Project</h1>
          <h2>Name of the project owner</h2>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, libero
          nisi velit mollitia sint ipsum reprehenderit blanditiis vel ex omnis
          officiis distinctio eum dolor deserunt tenetur ad eligendi recusandae
          ducimus?
        </p>
        <div className="flex justify-between mt-10">
          <div className="flex gap-5">
            <p>Hitech</p>
            <p>Banking</p>
          </div>
          <p>rating: 7.5</p>
        </div>
      </div>
    </section>
  );
};
export default Projects;
