function TaskContainer() {
   return (
      <div className=" bg-blue-400 flex flex-col py-5 w-100 max-h-screen min-h-[70vh] ">
         <div>
            <h2 className="text-blue-50 font-tm-title text-5xl text-center">
               TODO
            </h2>
         </div>

         <div className=" ">
            <p className="bg-blue-50 rounded-sm shadow-sm text-center mx-5 py-4 my-8 ">
               User stories
            </p>
            <p className="bg-blue-50 rounded-sm shadow-sm text-center mx-5 py-4 my-8 ">
               UML
            </p>
            <p className="bg-blue-50 rounded-sm shadow-sm text-center mx-5 py-4 my-8 ">
               Maquette
            </p>
            <p className="bg-blue-50 rounded-sm shadow-sm text-center mx-5 py-4 my-8 ">
               API
            </p>
         </div>
      </div>
   );
}

export default TaskContainer;
