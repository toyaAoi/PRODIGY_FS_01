// import { useLocation,Navigate,Outlet, useNavigate } from "react-router-dom";
// import useAuth from "../components/hooks/useAuth";



// const privateRoute =({allowedRoles})=>{
    
//     const {auth} =useAuth();
//     const location=useLocation();
//     return(
//         auth?.roles?.find(role => allowedRoles?.includes(role))
//         ?<Outlet/>
//        : auth?.user
//              ?<Navigate to="/unauthorized" state={{ from: location }} replace />
//             :<Navigate to ="/login" state={{from:location}} replace/>

//     )
    
// }
// export default privateRoute;



// // import { useLocation, Navigate, Outlet } from "react-router-dom";
// // import useAuth from "../components/hooks/useAuth";

// // const PrivateRoute = ({ allowedRoles }) => {
// //     const { auth } = useAuth();
// //     const location = useLocation();

// //     return (
// //         auth?.roles?.some(role => allowedRoles.includes(role))
// //         ? <Outlet />
// //         : auth?.user
// //             ? <Navigate to="/unauthorized" state={{ from: location }} replace />
// //             : <Navigate to="/login" state={{ from: location }} replace />
// //     );
// // };

// // export default PrivateRoute;

// // const AdminRoute = () => {
// //     const { auth } = useAuth();
// //     const location = useLocation();

// //     return (
// //         auth?.roles?.includes('admin')
// //         ? <Outlet />
// //         : <Navigate to="/unauthorized" state={{ from: location }} replace />
// //     );
// // };


// // const UserRoute = () => {
// //     const { auth } = useAuth();
// //     const location = useLocation();

// //     return (
// //         auth?.roles?.includes('user')
// //         ? <Outlet />
// //         : <Navigate to="/unauthorized" state={{ from: location }} replace />
// //     );
// // };

// // export { AdminRoute, UserRoute };
