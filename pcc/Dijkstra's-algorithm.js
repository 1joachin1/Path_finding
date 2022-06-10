
//Dijkstra algorithm is used to find the shortest distance between two nodes inside a valid weighted graph. Often used in Google Maps, Network Router etc.

//helper class for PriorityQueue
function _$(elt)
{
    return document.getElementById(elt);
}

function _createElt(elt)
{ 
    return document.createElement(elt);
}

window.addEventListener('load', function(e){
    e.preventDefault()
    var f1 = _$('form1');
    var nameorigin, nameending,namelists;
    var r=0 , s=0;

    f1.addEventListener('submit', function(e){
       e.preventDefault();
      nameorigin = _$('origin').value;
      nameending = _$('ending').value;
      namelists = document.querySelector('.list');
      
      if(nameorigin!="" && nameending!=" "){
        class Node {
          constructor(val, priority) {
            this.val = val;
            this.priority = priority;
          }
        }
        
        class PriorityQueue {
          constructor() {
            this.values = [];
          }
          enqueue(val, priority) {
            let newNode = new Node(val, priority);
            this.values.push(newNode);
            this.bubbleUp();
          }
          bubbleUp() {
            let idx = this.values.length - 1;
            const element = this.values[idx];
            while (idx > 0) {
              let parentIdx = Math.floor((idx - 1) / 2);
              let parent = this.values[parentIdx];
              if (element.priority >= parent.priority) break;
              this.values[parentIdx] = element;
              this.values[idx] = parent;
              idx = parentIdx;
            }
          }
          dequeue() {
            const min = this.values[0];
            const end = this.values.pop();
            if (this.values.length > 0) {
              this.values[0] = end;
              this.sinkDown();
            }
            return min;
          }
          sinkDown() {
            let idx = 0;
            const length = this.values.length;
            const element = this.values[0];
            while (true) {
              let leftChildIdx = 2 * idx + 1;
              let rightChildIdx = 2 * idx + 2;
              let leftChild, rightChild;
              let swap = null;
        
              if (leftChildIdx < length) {
                leftChild = this.values[leftChildIdx];
                if (leftChild.priority < element.priority) {
                  swap = leftChildIdx;
                }
              }
              if (rightChildIdx < length) {
                rightChild = this.values[rightChildIdx];
                if (
                  (swap === null && rightChild.priority < element.priority) ||
                  (swap !== null && rightChild.priority < leftChild.priority)
                ) {
                  swap = rightChildIdx;
                }
              }
              if (swap === null) break;
              this.values[idx] = this.values[swap];
              this.values[swap] = element;
              idx = swap;
            }
          }
        }
        
        //Dijkstra's algorithm only works on a weighted graph.
        
        class WeightedGraph {
          constructor() {
            this.adjacencyList = {};
          }
          addVertex(vertex) {
            if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
          }
          addEdge(vertex1, vertex2, weight) {
            this.adjacencyList[vertex1].push({ node: vertex2, weight });
            this.adjacencyList[vertex2].push({ node: vertex1, weight });
          }
          Dijkstra(start, finish) {
            const nodes = new PriorityQueue();
            const distances = {};
            const previous = {};
            let path = []; //to return at end
            let smallest;
            // var tab = document.querySelector('.tab');
            // var tr_ = create_element('tr');
            // tab.appendChild(tr_);
            
  
            //build up initial state
            for (let vertex in this.adjacencyList) {
              if (vertex === start) {
                distances[vertex] = 0;
                nodes.enqueue(vertex, 0);
              } else {
                distances[vertex] = Infinity;
                nodes.enqueue(vertex, Infinity);
              }
              previous[vertex] = null;
            }
            // as long as there is something to visit
            while (nodes.values.length) {
              // var td_ = create_element('td');
              // tr_.appendChild(td_);
              // td_.innerHTML= path;
  
              smallest = nodes.dequeue().val;
              if (smallest === finish) {
                //WE ARE DONE
                //BUILD UP PATH TO RETURN AT END
                while (previous[smallest]) {
                  path.push(smallest);
                  smallest = previous[smallest];
                }
                break;
              }
              if (smallest || distances[smallest] !== Infinity) {
                for (let neighbor in this.adjacencyList[smallest]) {
                  //find neighboring node
                  let nextNode = this.adjacencyList[smallest][neighbor];
                  //calculate new distance to neighboring node
                  let candidate = distances[smallest] + nextNode.weight;
                  let nextNeighbor = nextNode.node;
                  if (candidate < distances[nextNeighbor]) {
                    //updating new smallest distance to neighbor
                    distances[nextNeighbor] = candidate;
                    //updating previous - How we got to neighbor
                    previous[nextNeighbor] = smallest;
                    //enqueue in priority queue with new priority
                    nodes.enqueue(nextNeighbor, candidate);
                  }
                }
              }
  
            }
            return path.concat(smallest).reverse();
            // return path.concat(smallest);
            //  return path.concat(smallest).reverse();
          }
        }   
        
        //EXAMPLES=====================================================================
        
        var graph = new WeightedGraph();
  
        graph.addVertex("Analakely");
        graph.addVertex("Ambohijatovo");
        graph.addVertex("Isotry");
        graph.addVertex("Antohomadinika");
        graph.addVertex("Ankorondrano");
        graph.addVertex("Ivandry");
        graph.addVertex("Antanimena");
        graph.addVertex("Ankadifotsy");
        graph.addVertex("Ravohangy");
        graph.addVertex("Bel'air");
        graph.addVertex("Ampandrana");
        graph.addVertex("Antsakaviro");
        graph.addVertex("Tsiadana");
        graph.addVertex("Ankatso");
        graph.addVertex("Ambanidia");
        graph.addVertex("Anosy");
        graph.addVertex("Ampefiloha");
        graph.addVertex("Ambalavao");
  
        graph.addEdge("Analakely","Isotry", 2);
        graph.addEdge("Isotry", "Analakely", 2);
        graph.addEdge("Antohomadinika","Isotry", 3);
        graph.addEdge("Isotry","Antohomadinika", 3);
        graph.addEdge("Antohomadinika","Antanimena", 1);
        graph.addEdge("Antanimena", "Antohomadinika", 1);
        graph.addEdge("Antohomadinika" ,"Ankorondrano", 1);
        graph.addEdge("Ankorondrano" ,"Antohomadinika", 1);
        graph.addEdge("Ankorondrano" , "Ivandry" , 2);
        graph.addEdge("Ivandry" ,"Ankorondrano" , 2);
        graph.addEdge("Antanimena", "Ankadifotsy",4);
        graph.addEdge("Ankadifotsy", "Antanimena", 4);
        graph.addEdge("Ravohangy", "Ankadifotsy", 3);
        graph.addEdge("Ankadifotsy", "Ravohangy", 3); 
        graph.addEdge("Bel'air", "Ravohangy", 6); 
        graph.addEdge("Ravohangy", "Bel'air", 6); 
        graph.addEdge("Bel'air" ,"Ampandrana", 3);
        graph.addEdge("Ampandrana" ,"Bel'air", 3);
        graph.addEdge("Antsakaviro","Ampandrana",4);
        graph.addEdge("Ampandrana","Antsakaviro",4);
        graph.addEdge("Tsiadana","Antsakaviro", 6);
        graph.addEdge("Antsakaviro" ,"Tsiadana" , 6);
        graph.addEdge("Analakely" , "Ambohijatovo" , 1);
        graph.addEdge( "Ambohijatovo" , "Analakely" ,1);
        graph.addEdge("Ambohijatovo" , "Ambanidia" , 2);
        graph.addEdge( "Ambanidia" ,"Ambohijatovo" , 2);
        graph.addEdge("Ambohijatovo" , "Anosy" , 3);
        graph.addEdge( "Anosy" , "Ambohijatovo" ,3);
        graph.addEdge("Anosy" , "Ambalavao" , 5);
        graph.addEdge( "Ambalavao" ,"Anosy" , 5);
        graph.addEdge("Isotry" , "Ambalavao" , 4);
        graph.addEdge("Ambalavao" , "Isotry" , 4);
        graph.addEdge("Ambalavao" , "Ampefiloha", 2);
        graph.addEdge( "Ampefiloha", "Ambalavao" ,2);
        graph.addEdge("Ambanidia" , "Tsiadana" , 1);
        graph.addEdge( "Tsiadana" , "Ambanidia" ,1);
        graph.addEdge("Tsiadana" , "Ankatso" , 6);
        graph.addEdge("Ankatso" ,"Tsiadana" ,  6);
        
        console.log(graph.Dijkstra(nameorigin,nameending));
  
        var pathfinding= graph.Dijkstra(nameorigin , nameending).length;
        var i;
        if(nameorigin!=" " && nameending!=" "){
            var tr_ = _createElt('tr');
            tr_.id='tr'+r;
            namelists.appendChild(tr_);
  
            for(i=0; i<pathfinding; i++){
              var td_ = _createElt('td');
              td_.id= "td"+s;
              _$('tr'+r).appendChild(td_);
              _$('td'+s).innerHTML = graph.Dijkstra(nameorigin , nameending)[i];
              s++;
            }
            r++;
        }
        _$('ending').value = " ";
        _$('origin').value =" ";
      }else{
          alert("Insertion  invalid");
      }
    });
});
  



