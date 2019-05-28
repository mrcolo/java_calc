package application;

public class Line {

    private final long id;
    private double result [] = new double [20];

    public Line(long id, double [] result) {
        this.id = id;
        this.result = result;
    }

    public long getId() {
        return id;
    }

    public double [] getResult() {
        return result;
    }
}
