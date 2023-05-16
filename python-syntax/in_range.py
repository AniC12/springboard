def in_range(nums, lowest, highest):
    """Print numbers inside range.

    - nums: list of numbers
    - lowest: lowest number to print
    - highest: highest number to print

    For example:

      in_range([10, 20, 30, 40], 15, 30)

    should print:

      20 fits
      30 fits
    """
    is_in_range = False

    for num in nums:
        if num >= lowest and num <= highest:
            print(f"{num} fits")
            is_in_range = True

    if is_in_range == False:
        print("Out of range")

in_range([10, 20, 30, 40, 50], 15, 30)
in_range([10, 20, 30, 40, 50], 5, 9)
