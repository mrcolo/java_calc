package application;

import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
public class ComputationController {
			private final AtomicLong counter = new AtomicLong();
			private Calculator c = new Calculator();
			private final String endpoint = "http://1b9df289.ngrok.io";
			
			@CrossOrigin(origins = endpoint)
			@RequestMapping("/calc")
			public Computation calculate(@RequestParam(value="exp", defaultValue="") String exp) {
				return new Computation(counter.incrementAndGet(), c.computeString(exp));
			}

			@CrossOrigin(origins = endpoint)
			@RequestMapping("/linetool")
			public Line calculate(@RequestParam(value="m", defaultValue="1") String m,@RequestParam(value="b", defaultValue="0") String b) {
				return new Line(counter.incrementAndGet(), c.line_util(Double.parseDouble(m), Double.parseDouble(b)));
			}
}
