package application;

import java.util.*;
import java.lang.Math; 

public class Calculator {

    //Constructor
    public Calculator() {}
    
    //Compute Operations
    public double computeSimpleOp(double lhs, String op, double rhs) {
        switch(op){
            case "PLUS":
                return lhs + rhs;
            case "SUBTRACT":
                return lhs - rhs;
            case "DIVIDE":
                return lhs / rhs;
            case "MULTIPLY":
                return lhs * rhs;
        }
        return 0;
    }
    public double computeComplexOp(double lhs, String op) {
        switch(op){
            case "SIN":
                return sin(lhs);
            case "COS":
                return cos(lhs);
            case "TAN":
                return tan(lhs);
            case "LOG":
                return log(lhs);
            case "SQUARE":
                return square(lhs);
            case "CUBE":
                return cube(lhs);
            case "SQRT":
                return sqrt(lhs);
        }
        return 0;
    }
    public String computeString(String exp){
        if(exp.charAt(0) == '_'){
            int sep = exp.indexOf('!');

            String op = exp.substring(1, sep);
            double num = Double.parseDouble(exp.substring(sep + 1, exp.length()));

            return Double.toString(computeComplexOp(num, op));
        }
        else {
            int sep1 = exp.indexOf('!');
            int sep2 = exp.indexOf('$');
            double lhs = Double.parseDouble(exp.substring(0, sep1));
            String op = exp.substring(sep1 + 1, sep2);
            double rhs = Double.parseDouble(exp.substring(sep2 + 1, exp.length()));
            System.out.println(lhs);
            System.out.println(op);
            System.out.println(rhs);
            return Double.toString(computeSimpleOp(lhs, op, rhs));
        }       
    }

    public double sin(double lhs){
        return Math.sin(lhs);
    }
    public double cos(double lhs){
        return Math.cos(lhs);
    }
    public double tan(double lhs){
        return Math.tan(lhs);
    }
    public double log(double lhs){
        return Math.log(lhs);
    }
    public double square(double lhs){
        return Math.pow(lhs,2);
    }
    public double cube(double lhs){
        return Math.pow(lhs, 3);
    }
    public double sqrt(double lhs){
        return Math.sqrt(lhs);
    }
    public double [] line_util(double m, double b){
        double points [] = new double [20];

        for (int i = 0; i < 20; i++) {
            points[i] = m * i + b;   
        }

        return points;
    }
}
