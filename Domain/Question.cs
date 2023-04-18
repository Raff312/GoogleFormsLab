namespace GoogleForm.Domain;

public class Question {
    public bool? Required { get; set; }
    public TextQuestion? TextQuestion { get; set; }
    public ChoiceQuestion? ChoiceQuestion { get; set; }
}

public class TextQuestion {
}

public class ChoiceQuestion {
    public IList<Option> Options { get; set; } = new List<Option>();
}

public class Option {
    public string Value { get; set; } = string.Empty;
}
