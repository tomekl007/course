package hello;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
public class HelloController {


    private RecordRepository repository;

    @Autowired
    public HelloController(RecordRepository repository) {
        this.repository = repository;
    }


    @RequestMapping("/")
    public String index() {
        return "Greetings from Spring Boot!";
    }

    @RequestMapping("/a")
    public String a() {
        return "Greetings from Spring Boot!";
    }


    @RequestMapping(method = RequestMethod.GET, path = "/db")
    public String home(ModelMap model) {
        List<Record> records = repository.findAll();
        model.addAttribute("records", records);
        model.addAttribute("insertRecord", new Record());
        return "home";
    }


    @RequestMapping(method = RequestMethod.POST, path = "/db")
    public String insertData(ModelMap model,
                             @ModelAttribute("insertRecord") @Valid Record record,
                             BindingResult result) {
        if (!result.hasErrors()) {
            repository.save(record);
        }
        return home(model);
    }

}