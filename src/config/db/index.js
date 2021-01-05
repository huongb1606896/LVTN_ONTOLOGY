const { EnapsoGraphDBClient } = require("@innotrade/enapso-graphdb-client");
 
const GRAPHDB_BASE_URL = "http://localhost:7200",
  GRAPHDB_REPOSITORY = "my_repo",
  GRAPHDB_USERNAME = "mhuong",
  GRAPHDB_PASSWORD = "mhuong",
  GRAPHDB_CONTEXT_TEST = "http://www.semanticweb.org/minhhuong/ontologies/2020/9/untitled-ontology-3";
 
const DEFAULT_PREFIXES = [
  EnapsoGraphDBClient.PREFIX_OWL,
  EnapsoGraphDBClient.PREFIX_RDF,
  EnapsoGraphDBClient.PREFIX_RDFS,
  EnapsoGraphDBClient.PREFIX_XSD,
  EnapsoGraphDBClient.PREFIX_PROTONS,
  {
    prefix: "data",
    iri: "http://www.semanticweb.org/minhhuong/ontologies/2020/9/untitled-ontology-3#",
  }
];

let graphDBEndpoint = new EnapsoGraphDBClient.Endpoint({
    baseURL: GRAPHDB_BASE_URL,
    repository: GRAPHDB_REPOSITORY,
    prefixes: DEFAULT_PREFIXES,
});

module.exports = graphDBEndpoint;