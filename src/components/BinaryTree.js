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
          // check if left subtree is null
          if (root.left !== null){
              this.insert(node, root.left);  
          }
          else{
              root.left = node;
              node.parent = root;
          }
      } else {
          // check if right subtree is null
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
    }

    componentDidMount() {       
        this.renderTree();
    }

    renderTree() {
        console.log("Generando Arbol");
        const svg = d3.select(this.refs.canvas).append('svg');
        svg.attr("width", 5000);
        svg.attr("heigth", 5000);                
    }

    addItem(valor) { //Recopila el valor y lo añade al arbol.        
        console.log("El valor es:", valor);
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
            
            const svg = d3.select("svg");
            
            let ellipse = svg.append("ellipse")
                        .style("fill", "red")
                        .attr("cx", nodo.value.x)
                        .attr("cy", nodo.value.y)
                        .attr("rx", 20)
                        .attr("ry", 20);
            ellipse.transition().style("fill", "#1C73E3")
                        .attr("cx", nodo.value.x + 30)
                        .attr("cy", nodo.value.y + 30)
                        .attr("rx", 20)
                        .attr("ry", 20)
                        .attr("stroke", "black")
                        .ease(d3.easeElastic, 1)
                        .duration(1000);
        }
        
        //Agregar un elemento.
        else {
            nodo = new Node({number: valor});
            this.state.arbol.insert(nodo, this.state.arbol.root);
            //Tomar los datos del padre y del hijo
            console.log("Datos del hijo", nodo);
        } 
        
        //Pintar el elemento en el svg.

    }

    render(){
        let number = "";
        return (
            <div className="container-fluid">
                <h1 className="centrar">{this.state.mensaje}</h1>
                <div className="row"> 
                    <form className="form-inline">
                        <label className="form-control">Ingrese un valor</label>
                        <input type="number" className="form-control" id="valor" placeholder="Valor" onChange={evt => number = evt.target.value}></input>                        
                        <button type="button" id="agregar" className="btn-success" onClick={evt => {evt.preventDefault(); this.addItem(number); number = "";}}>Agregar Valor</button>
                    </form>
                    <div ref="canvas">                        
                    </div>
                </div>
            </div>
        );
    }
}
