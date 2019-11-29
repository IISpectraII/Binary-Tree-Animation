import React, { Component } from "react";
import * as d3 from "d3";

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
  
  // Insert Node
  insert(node, root){
      if (node.value == root.value) { //Caso Base: El valor ya existe en el arbol! 
          return ;
      }
      else if(node.value < root.value) { //Caso Recursivo #1: El valor es menor que el nodo actual => Avanzar
          // check if left subtree is null
          if (root.left != null){
              this.insert(node, root.left);  
          }
          else{
              root.left = node;
              node.parent = root;
          }
      } else {
          // check if right subtree is null
          if (root.right != null){
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
    render(){
        return (
            <div className="container-fluid">
                <h1>Hola Mundo</h1>
            </div>
        );
    }
}
