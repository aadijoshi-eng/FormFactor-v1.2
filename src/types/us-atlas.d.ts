declare module "us-atlas/counties-10m.json" {
  import type { GeometryCollection, Topology } from "topojson-specification";

  const topology: Topology<{
    states: GeometryCollection;
    counties: GeometryCollection;
    nation: GeometryCollection;
  }>;

  export default topology;
}
