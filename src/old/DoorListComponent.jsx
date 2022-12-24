// import React from 'react'
// import { fetcher } from "../utils/ApiCaller";
// import useSWR from "swr";



// export default function DoorListComponent(){
//     const { data, error } = useSWR(
//         process.env.REACT_APP_BACKEND_URL + "/doors",
//         fetcher
//       );
      
      
//       return (
//           <div>
//             <h1 className = "text-center"> Door List </h1>     
//                 <table className = "table table-striped">
//                     <thead>
//                         <tr>
//                             <td>Door Id</td>
//                             <td>door Name</td>
//                             <td>Door Direction id</td>
//                             <td>Door type</td>
//                             <td>Door from area id</td>
//                             <td>Door to area id</td>
//                             {/* <td><submit>submit</submit></td> */}
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             data ? data.map(
//                                 door =>
//                                 <tr key = {door.id}>
//                                     <td>{door.id}</td>
//                                     <td>{door.name}</td>
//                                     <td>{door.direction}</td>
//                                     <td>{door.doortype.id}</td>
//                                     <td>{door.from_area.id}</td>
//                                     <td>{door.to_area.id}</td>
                                   
//                                 </tr>
//                             )
//                         : "no data retrieved"}
//                     </tbody>
//                 </table>
//             </div>
//   );
// }


//     // json.payload.map(j =>
//     //  <div>
//     //      {j.name}
//     //      {j.brands.map(b =>
//     //          <div>
//     //              {b.name}
//     //              {b.subProducts.map(s =>
//     //                  <div>
//     //                      {s.name}
//     //                  </div>)
//     //              }
//     //          </div>
//     //      )}
//     //  </div>
//     // )


