import React, { useState } from 'react'
import PropagateLoader from "react-spinners/PropagateLoader";

const Loading = () => {

  let [loading, setLoading] = useState(true);

  return (
    <div className="sweet-loading text-center">
      <PropagateLoader
        color={"#e60f53"}
        loading={loading}
        size={20}
      />
    </div>
  )
}

export default Loading