package application;

public class Computation {

    private final long id;
    private final String result;

    public Computation(long id, String result) {
        this.id = id;
        this.result = result;
    }

    public long getId() {
        return id;
    }

    public String getResult() {
        return result;
    }
}
