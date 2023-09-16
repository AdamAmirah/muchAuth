const AuthLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gradient-to-b from-indigo-400 to-indigo-700">
      <div className="m-auto bg-slate-50 rounded-md w-3/5 h-3/4 grid lg:grid-cols-2">
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-500 rounded-l-md">
          <div
            className="absolute inset-0 bg-center bg-no-repeat bg-[url('/assets/login3.png')] bg-cover z-1"
            style={{ backgroundPosition: "50% 50%", backgroundSize: "80%" }}
          ></div>
        </div>

        <div className="right flex flex-col overflow-hidden ">
          <div className="text-center py-10">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
