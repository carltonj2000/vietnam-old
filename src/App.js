import React from "react";

import Layout from "./Layout";
import Table from "./Table";

export default function App() {
  return (
    <Layout>
      <Table showLinks={true} />
    </Layout>
  );
}
