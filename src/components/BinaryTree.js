import React, { Component } from "react";
import * as d3 from "d3";
import "./BinaryTree.css";

//? Nodo del arbol
//? El atributo value es un objeto de la forma
//! {x: Coordenada en el plano x, y: Coordenada en y, number: Valor del nodo}
class Node {
  constructor(value){
      this.value = value;
      this.parent = null;
      this.left = null;
      this.right = null;
  }
}

class BinarySearchTree {
  constructor(node){
      this.root = node;
  }
  
  //? Inserta un nodo en el arbol.
  insert(node, root){
      if (node.value.number === root.value.number) { //Caso Base: El valor ya existe en el arbol! 
          return ;
      }
      else if(node.value.number < root.value.number) { //Caso Recursivo #1: El valor es menor que el nodo actual => Avanzar                  
          if (root.left !== null){
              this.insert(node, root.left);  
          }
          else{
              root.left = node;
              node.parent = root;
          }
      } else { //Caso Recursivo #2: Agregar por la derecha         
          if (root.right !== null){              
              this.insert(node, root.right); 
          }
          else{
              root.right = node; 
              node.parent = root;
          }
      }    
  }
}

export default class BinaryTree extends Component {

    state = {
        mensaje: "Arbol Binario",
        arbol: null,
        colores: ["red", "blue", "green", "orange", "purple", "black", "yellow"]        
    }

    componentDidMount() {       
        this.renderTree();
    }

    renderTree() {        
        const svg = d3.select(this.refs.canvas).append('svg');
        svg.attr("width", 10000);
        svg.attr("heigth", 10000);                
    }

    addItem(valor) { //Recopila el valor y lo añade al arbol.  
        if (valor === "") {
            return alert("Ingrese un número");
        }                      
        const svg = d3.select("svg");
        let random = Math.floor(Math.random() * (this.state.colores.length - 0)) + 0;
        let color = this.state.colores[random];        
        let nodo; //Nodo nuevo a almacenar.

        //Agregar el primer elemento al arbol
        if (this.state.arbol === null) {
            let value = { //Valor del nodo.
                x: 650,
                y: 10,
                number: valor
            };

            nodo = new Node(value)
            this.setState({arbol: new BinarySearchTree(nodo)});

            //Dibujar el primer elemento.            
            let ellipse = svg.append("ellipse")
                        .style("fill", color)
                        .attr("cx", nodo.value.x)
                        .attr("cy", nodo.value.y)
                        .attr("rx", 20)
                        .attr("ry", 20);
            ellipse.transition().style("fill", color)
                        .attr("cx", nodo.value.x + 30)
                        .attr("cy", nodo.value.y + 30)
                        .attr("rx", 20)
                        .attr("ry", 20)
                        .attr("stroke", "black")
                        .ease(d3.easeElastic, 1)
                        .duration(1000);
            svg.append("text")
                .attr("x", nodo.value.x + 80)
                .attr("y", nodo.value.y + 30)
                .attr("font-size", "20px")
                .text(nodo.value.number);

            return;
        }
        
        //Agregar un elemento.
        else {
            nodo = new Node({number: valor});
            this.state.arbol.insert(nodo, this.state.arbol.root);                        
        } 
        
        if (nodo.parent === null) { //El valor ya existe en el arbol !
            return alert(`El valor ${valor} ya se encuentra agregado !`);
        }

        //Soy el hijo izquierdo.        
        if (nodo.parent.left !== null && nodo.parent.left.value.number === nodo.value.number) {
            //Actualizar coordenadas.            
            nodo.value.x = nodo.parent.value.x - 60;
            nodo.value.y = nodo.parent.value.y + 60;            
            
            //Dibujar.
            let ellipse = svg.append("ellipse")
                        .style("fill", color)
                        .attr("cx", nodo.value.x)
                        .attr("cy", nodo.value.y)
                        .attr("rx", 20)
                        .attr("ry", 20);
            ellipse.transition().style("fill", color)
                        .attr("cx", nodo.value.x + 30)
                        .attr("cy", nodo.value.y + 30)
                        .attr("rx", 20)
                        .attr("ry", 20)
                        .attr("stroke", "black")
                        .ease(d3.easeElastic, 1)
                        .duration(1000);
            
            //Dibujar la linea para conectar ambos nodos.
            svg.append("line")
                    .attr("x1", nodo.parent.value.x + 30)
                    .attr("y1", nodo.parent.value.y + 30)
                    .attr("x2", nodo.value.x + 30)
                    .attr("y2", nodo.value.y + 30)
                    .attr("stroke-width", 3)
                    .attr("stroke", color);

            svg.append("text")
                .attr("x", nodo.value.x - 30)
                .attr("y", nodo.value.y + 30)
                .attr("font-size", "20px")
                .text(nodo.value.number);
        }
        else { //Soy el hijo derecho.
            //Actualizar coordenadas.            
            nodo.value.x = nodo.parent.value.x + 60;
            nodo.value.y = nodo.parent.value.y + 60;            
            
            //Dibujar.
            let ellipse = svg.append("ellipse")
                        .style("fill", color)
                        .attr("cx", nodo.value.x)
                        .attr("cy", nodo.value.y)
                        .attr("rx", 20)
                        .attr("ry", 20);
            ellipse.transition().style("fill", color)
                        .attr("cx", nodo.value.x + 30)
                        .attr("cy", nodo.value.y + 30)
                        .attr("rx", 20)
                        .attr("ry", 20)
                        .attr("stroke", "black")
                        .ease(d3.easeElastic, 1)
                        .duration(1000);
            
            //Dibujar la linea para conectar ambos nodos.
            svg.append("line")
                    .attr("x1", nodo.parent.value.x + 30)
                    .attr("y1", nodo.parent.value.y + 30)
                    .attr("x2", nodo.value.x + 30)
                    .attr("y2", nodo.value.y + 30)
                    .attr("stroke-width", 3)
                    .attr("stroke", color);
            
            svg.append("text")
                .attr("x", nodo.value.x + 80)
                .attr("y", nodo.value.y + 30)
                .attr("font-size", "20px")
                .text(nodo.value.number);
        }        
    }

    render(){
        let number = "";
        return (
            <div>
                <h1 className="centrar">{this.state.mensaje}</h1>
                <div className="row"> 
                    <form className="form-inline">
                        <label className="form-control">Ingrese un valor</label>
                        <input type="number" className="form-control" id="valor" placeholder="Valor" onChange={evt => number = evt.target.value} required></input>                        
                        <button type="button" id="agregar" className="btn-success" onClick={evt => {evt.preventDefault(); this.addItem(number); document.getElementById('valor').value=""}}>Agregar Valor</button>
                    </form>                    
                </div>
                <div ref="canvas">                        
                </div>
            </div>
        );
    }
}
